import React, { useEffect, useState, useRef, useCallback } from 'react';

import MatchRemainingProgress from './game/MatchRemainingProgress';
import Input from './game/Input';
import Sentence from './game/Sentence';
import Players from './game/Players';

import { ALLOWED_KEYS } from '../constants/constants';

import type { Socket } from 'socket.io-client';
import type { TypingLogType } from '../types/typingLog';
import type { Players as PlayersType } from '../types/players';
import type { SocketStatus } from '../types/socketStatus';

type matchRemainingTimeType = {
    matchPlayTime: number;
    remainingTime: number;
};

type MatchProps = {
    matchRemainingTime: matchRemainingTimeType;
    socket: Socket;
    roomId: string | null;
    matchLog: { player: PlayersType; opponent: PlayersType } | null;
    children: React.ReactNode;
    status: SocketStatus;
    matchStartTime: number | null;
    opponentCpm: number;
};

const Match = ({
    matchRemainingTime,
    socket,
    roomId,
    matchLog,
    children,
    status,
    matchStartTime,
    opponentCpm,
}: MatchProps) => {
    const { player } = matchLog || {};
    const { sentence, isCompleted } = player || { sentence: '', isCompleted: false };
    const { matchPlayTime, remainingTime } = matchRemainingTime;

    const inputRef = useRef<HTMLInputElement>(null);

    const [input, setInput] = useState<string>('');
    const [log, setLog] = useState<TypingLogType[]>([]);

    const [keyDownCount, setKeyDownCount] = useState<number>(0);

    const fnEnabled = () => {
        return status !== 'match_start' || !isCompleted;
    };

    //==============
    // 로그 전송 핸들러
    //==============
    useEffect(() => {
        if (log.length === 0 || !fnEnabled()) return;
        // 로그 전송 (정확도는 서버에서 계산.)

        socket.emit('match_log', roomId, log);
    }, [log, setLog]);

    //==============
    // 입력 완료 핸들러
    //==============
    const handleComplete = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!fnEnabled()) return;
            if (e.key === 'Enter' && input.length === sentence.length) {
                setLog((prev) => [
                    ...prev,
                    {
                        sentence,
                        typing: input,
                    },
                ]);
                if (inputRef.current) {
                    inputRef.current.value = '';
                    setInput('');
                }
            }

            if (e.code.startsWith('Key') || ALLOWED_KEYS.includes(e.code)) {
                setKeyDownCount((prev) => prev + 1);
            }
        },

        [setLog, inputRef, sentence, input]
    );

    //==============
    // 키 다운 핸들러
    //==============
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (!fnEnabled()) return;
            const currentValue = e.currentTarget.value;
            setInput(currentValue);
        },
        [keyDownCount, input]
    );

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <MatchRemainingProgress matchPlayTime={matchPlayTime} remainingTime={remainingTime} />
                <Players>
                    <Players.Player>
                        <Players.Cpm
                            keyDownCount={keyDownCount}
                            matchStartTime={matchStartTime}
                            socket={socket}
                            roomId={roomId}
                            isCompleted={player?.isCompleted}
                        />
                        <Players.Accuracy accuracy={matchLog?.player?.accuracy ?? 0} />
                        <Players.Score score={matchLog?.player?.point ?? 0} />
                        <Players.Progress progress={matchLog?.player?.progress ?? 0} />
                    </Players.Player>
                    <Players.Player>
                        <Players.Cpm opponentCpm={opponentCpm} />
                        <Players.Accuracy accuracy={matchLog?.opponent?.accuracy ?? 0} />
                        <Players.Score score={matchLog?.opponent?.point ?? 0} />
                        <Players.Progress progress={matchLog?.opponent?.progress ?? 0} />
                    </Players.Player>
                </Players>
                <Sentence sentence={sentence} input={input} isCompleted={isCompleted} />
                <Input
                    handleKeyDown={handleKeyDown}
                    inputRef={inputRef}
                    handleComplete={handleComplete}
                    disabled={status !== 'match_start' || isCompleted}
                    placeholder={`${
                        status === 'match_start' && !isCompleted
                            ? '여기에 입력해주세요'
                            : status === 'match_result' || isCompleted
                            ? '모든 입력이 끝났어요.'
                            : status === 'found_match'
                            ? '게임이 곧 시작 됩니다.'
                            : ''
                    }`}
                />
            </div>
            <>{children}</>
        </div>
    );
};

export default Match;
