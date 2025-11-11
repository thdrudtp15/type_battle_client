import { useState, useEffect, useRef } from 'react';

import TypingLog from '../ui/TypingLog';
import TypingAccuracy from '../ui/TypingAccuracy';
import TypingSpeed from '../ui/TypingSpeed';
import Modal from '../ui/Modal';

import { THROTTLE_TIME } from '../../constants/constants';

import type { TypingLogType } from '../../types/typingLog';
import type { Socket } from 'socket.io-client';
import type { SocketStatus } from '../../types/socketStatus';

type MatchProps = {
    socket: Socket;
    roomId: string | null;
    gameCountdown: number;
    gameStartTime: number | null;
    alarm: string | null;
    setStatus: (status: SocketStatus) => void;
    elapsedTime: number;
    opponentInput: string;
    opponentLog: TypingLogType[];
    isTypingEnd: boolean;
    sentence: string[];
};

const Match = ({
    socket,
    roomId,
    gameCountdown,
    gameStartTime,
    alarm,
    setStatus,
    elapsedTime,
    opponentInput,
    opponentLog,
    isTypingEnd,
    sentence,
}: MatchProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const lastEmitTimeRef = useRef<number>(0);

    const [input, setInput] = useState<string>('');
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
    const [log, setLog] = useState<TypingLogType[]>([]);
    const [keyDownCount, setKeyDownCount] = useState<number>(0);

    const loseTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    //==============
    // 입력 카운트 핸들러
    //==============
    useEffect(() => {
        if (!gameStartTime) return;

        loseTimeout.current = setTimeout(() => {
            handleLose();
        }, 20000);

        setKeyDownCount(keyDownCount + 1);

        const now = Date.now();
        const timeSinceLastEmit = now - lastEmitTimeRef.current;

        if (timeSinceLastEmit >= THROTTLE_TIME) {
            socket.emit('typing_input', roomId, input);
            lastEmitTimeRef.current = now;
        }

        return () => {
            clearInterval(loseTimeout.current);
        };
    }, [input, gameStartTime]);

    //==============
    // 로그 전송 핸들러
    //==============
    useEffect(() => {
        if (log.length === 0) return;
        // 로그 전송

        socket.emit('typing_input', roomId, '');
        socket.emit('typing_log', roomId, log);
        socket.emit('typing_sentence', roomId, currentSentenceIndex);

        if (currentSentenceIndex === sentence.length) {
            handleMatchEnd();
        }
    }, [log, setLog]);

    //==============
    // 게임 시작 시 input 포커싱
    //==============
    useEffect(() => {
        if (gameStartTime) {
            inputRef.current?.focus();
        }
    }, [gameStartTime]);

    //==============
    // 입력 변경 핸들러
    //==============
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    //==============
    // 입력 완료 핸들러
    //==============
    const handleComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && input.length === sentence[currentSentenceIndex].length) {
            setCurrentSentenceIndex(currentSentenceIndex + 1);
            setLog((prev) => [
                ...prev,
                {
                    sentence: sentence[currentSentenceIndex],
                    typing: input,
                },
            ]);
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        }
    };

    //==============
    // 게임 종료 핸들러
    //==============
    const handleMatchEnd = () => {
        // console.log(gameStartTime);
        // console.log(gameCountdown);

        if (!roomId && !gameStartTime) return;
        socket.emit('typing_end', roomId);
    };

    //==============
    // 입력 없을 경우 패배 처리
    //==============
    const handleLose = () => {
        socket.emit('match_cancelled_by_timeout', roomId);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div id="player" className="w-full h-full flex flex-col items-center justify-center">
                {/**통계 및 정보 표시 */}
                <div id="information" className="flex flex-col items-center justify-center">
                    {/**컴포넌트 분리 */}
                    {elapsedTime > 0 && <p>경과 시간 : {elapsedTime}초</p>}

                    {gameCountdown > 0 && <p>시작까지 남은 시간 : {gameCountdown}초</p>}
                    {alarm === 'opponent_disconnected' && (
                        <Modal onClose={() => setStatus('connected')}>상대방이 게임을 취소했습니다.</Modal>
                    )}
                    {alarm === 'opponent_timeout' && (
                        <Modal onClose={() => setStatus('connected')}>
                            상대방이 타이핑을 타이핑을 입력하지 않아 게임이 취소되었습니다.
                        </Modal>
                    )}
                    {alarm === 'player_timeout' && (
                        <Modal onClose={() => setStatus('connected')}>
                            20초간 타이핑을 입력하지 않아 게임이 취소되었습니다.
                        </Modal>
                    )}
                    {!gameStartTime && <p>게임을 준비해주세요</p>}
                    {gameStartTime && gameStartTime > 0 && <p>게임이 시작 되었습니다.</p>}

                    <TypingLog log={log} />
                    <TypingAccuracy log={log} />
                    <TypingSpeed startTime={gameStartTime} keyDownCount={keyDownCount} />
                </div>
                <p>{sentence[currentSentenceIndex]}</p>
                {!isTypingEnd && (
                    <input
                        className="border rounded"
                        type="text"
                        ref={inputRef}
                        disabled={!gameStartTime}
                        onChange={handleInputChange}
                        onKeyDown={handleComplete}
                    />
                )}
                {!isTypingEnd && <button onClick={handleMatchEnd}>타이핑 마치기</button>}
                {isTypingEnd && <p>타이핑이 완료되었습니다.</p>}
            </div>
            <div id="opponent" className="w-full h-full flex items-center justify-center">
                <TypingLog log={opponentLog} />
                <p>상대방 입력 : {opponentInput}</p>
            </div>
        </div>
    );
};

export default Match;

// 소켓 서버에서는 시작 시간 보내줘야 함. OK

// 쓰로틀링 이용해서 input 보내기 (진행 사항)
// 로그 보내기 OK

// 타이핑 모두 끝내면 완료 요청 보내는 로직 추가. OK
// 타이핑 스피드 수정(게임을 끝낸 상태에서도 계속 진행 되는 문제 발생.)
// 게임 완료 시 input 비활성화 및 게임 시작 이전 input 비활성화 OK

// 끝끝
// 로그 기반으로 소켓 서버에서 틀린 거 만큼 시간 추가해서 결과 보여주기 (약간 이상하지만 OK)

// 몇 초 동안 입력 없을 경우 세션 종료 OK
