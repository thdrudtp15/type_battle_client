import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import type { SocketStatus } from '../types/socketStatus';

const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [status, setStatus] = useState<SocketStatus>('disconnected');
    const [roomId, setRoomId] = useState<string | null>(null);
    const [opponentReady, setOpponentReady] = useState(false);
    const [alarm, setAlarm] = useState<string | null>(null);
    const [readyCountdown, setReadyCountdown] = useState<number>(0);
    const [gameCountdown, setGameCountdown] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [gameStartTime, setGameStartTime] = useState<number | null>(null);
    const [opponentInput, setOpponentInput] = useState<string>('');
    const [opponentLog, setOpponentLog] = useState<{ sentence: string; typing: string }[]>([]);
    const [result, setResult] = useState<{
        myResult: { failedCount: number; elapsedTime: number; penaltyTime: number; totalTime: number };
        opponentResult: { failedCount: number; elapsedTime: number; penaltyTime: number; totalTime: number };
    } | null>(null);
    const [isTypingEnd, setIsTypingEnd] = useState(false);
    const [sentence, setSentence] = useState<string[]>([]);

    const [matchCountdown, setMatchCountdown] = useState<number>(0);
    const [matchRemainingTime, setMatchRemainingTime] = useState<{ matchPlayTime: number; remainingTime: number }>({
        matchPlayTime: 0,
        remainingTime: 0,
    });

    const resetGame = () => {
        setStatus('connected');
        setRoomId(null);
        setOpponentReady(false);
        setReadyCountdown(0);
        setGameCountdown(0);
        setElapsedTime(0);
        setGameStartTime(null);
        setOpponentInput('');
        setOpponentLog([]);
        setResult(null);
        setIsTypingEnd(false);
        setSentence([]);
    };

    useEffect(() => {
        const socket = io('http://localhost:3001', {
            reconnection: true, // 재연결 여부
            reconnectionAttempts: 5, // 재연결 시도 횟수
            reconnectionDelay: 1000, // 재연결 딜레이
            reconnectionDelayMax: 5000, // 재연결 딜레이 최대값
        });

        setSocket(socket);

        //==============
        // 연결 이벤트 핸들러
        //==============
        socket.on('connect', () => {
            console.log('연결 성공');
            setStatus('connected');
        });

        socket.on('disconnect', () => {
            console.log('연결 해제');
            resetGame();
            setStatus('disconnected');
        });

        //==============
        // 재연결 이벤트 핸들러
        //==============
        socket.on('reconnect_attempt', () => {
            console.log('재연결 시도 중');
            setStatus('connecting');
        });

        socket.on('reconnect', () => {
            console.log('재연결 성공');
            setStatus('connected');
        });

        socket.on('reconnect_error', () => {
            console.log('재연결 실패');
            setStatus('disconnected');
        });

        socket.on('connect_error', () => {
            console.log('연결 실패');
            setStatus('disconnected');
        });

        //==============
        // 서버 상태 핸들러
        //==============
        socket.on('find_match', () => {
            setStatus('finding_match');
        });
        socket.on('cancel_find_match', () => {
            setStatus('connected');
        });

        // 매치 찾기 성공.
        socket.on('found_match', (data) => {
            const { roomId } = data;
            setRoomId(roomId);
            setStatus('found_match');
        });

        socket.on('match_cancelled', (data) => {
            const { reason } = data;
            setAlarm(reason);
            resetGame();
        });

        socket.on('match_start', (data) => {
            const { sentence } = data;
            setSentence(sentence);
            setStatus('match_start');
        });

        socket.on('match_countdown', (data) => {
            const { countdown } = data;
            setMatchCountdown(countdown);
        });

        socket.on('match_remaining_time', (data) => {
            const { matchPlayTime, remainingTime } = data;
            setMatchRemainingTime({ matchPlayTime, remainingTime });
        });

        socket.on('match_result', () => {
            setStatus('match_result');
        });

        //==============
        // 매칭 이벤트 핸들러
        //==============
        socket.on('matching', () => {
            setStatus('waiting');
        });

        socket.on('matching_cancel', () => {
            setStatus('connected');
        });

        socket.on('matched', (data) => {
            const { roomId } = data;
            setStatus('matched');
            setRoomId(roomId);
        });
        // socket.on('match_end', () => {
        //     setStatus('result');
        // });

        socket.on('ready_countdown', (data) => {
            const { remainingCount } = data;
            setReadyCountdown(remainingCount);
        });

        //==============
        // 상대방 준비상태 핸들러
        //==============
        socket.on('opponent_ready', () => {
            setOpponentReady(true);
        });

        socket.on('opponent_cancel_ready', () => {
            setOpponentReady(false);
        });

        //==============
        // 게임 시작 이벤트 핸들러
        //==============
        socket.on('game_ready', () => {
            setStatus('playing');
        });

        socket.on('game_start', (data) => {
            console.log(status);
            const { startTime, sentence } = data;
            setSentence(sentence);
            setGameStartTime(startTime);
        });

        socket.on('game_end', (data) => {
            console.log(data);
            const { myResult, opponentResult } = data;
            setResult({ myResult, opponentResult });
            setStatus('result');
            setSentence([]);
        });

        socket.on('game_countdown', (data) => {
            const { remainingCount } = data;
            setGameCountdown(remainingCount);
        });

        socket.on('elapsed_time', (data) => {
            const { elapsedTime } = data;
            setElapsedTime(elapsedTime);
        });

        //==============
        // 게임 프로세스
        //==============
        socket.on('opponent_typing_input', (data) => {
            const { input } = data;
            setOpponentInput(input);
        });

        socket.on('opponent_typing_log', (data) => {
            const { log } = data;
            setOpponentLog(log);
        });
        socket.on('typing_end', () => {
            setIsTypingEnd(true);
        });

        return () => {
            socket.close();
        };
    }, []);

    return {
        socket,

        opponentReady,
        alarm,
        setAlarm,
        setStatus,
        readyCountdown,
        gameCountdown,
        gameStartTime,
        elapsedTime,
        opponentInput,
        opponentLog,
        result,
        isTypingEnd,
        sentence,
        ///
        matchCountdown,
        matchRemainingTime,
        status,
        roomId,
    };
};

export default useSocket;
