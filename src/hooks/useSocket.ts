import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import type { SocketStatus } from '../types/socketStatus';
import type { Players } from '../types/players';

const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [status, setStatus] = useState<SocketStatus>('disconnected');
    const [roomId, setRoomId] = useState<string | null>(null);
    const [alarm, setAlarm] = useState<string | null>(null);
    const [matchStartTime, setMatchStartTime] = useState<number | null>(null);
    const [matchCountdown, setMatchCountdown] = useState<number>(0);
    const [matchLog, setMatchLog] = useState<{ player: Players; opponent: Players } | null>(null);
    const [matchRemainingTime, setMatchRemainingTime] = useState<{ matchPlayTime: number; remainingTime: number }>({
        matchPlayTime: 0,
        remainingTime: 0,
    });
    const [matchResult, setMatchResult] = useState<{
        player: Players;
        opponent: Players;
    } | null>(null);

    const [opponentCpm, setOpponentCpm] = useState<number>(0);

    const resetGame = () => {
        setStatus('connected');
        setRoomId(null);
        setMatchStartTime(null);
        setMatchCountdown(0);
        setMatchLog(null);
        setMatchRemainingTime({ matchPlayTime: 0, remainingTime: 0 });
        setMatchResult(null);
        setOpponentCpm(0);
    };

    const production = import.meta.env.MODE === 'production';
    const serverUrl = production ? import.meta.env.VITE_SERVER_URL : 'http://localhost:3001';

    useEffect(() => {
        const socket = io(serverUrl, {
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
            const { player, opponent, matchStartTime } = data;
            setMatchLog({ player, opponent });
            setMatchStartTime(matchStartTime);
            setStatus('match_start');
        });

        socket.on('match_log', (data) => {
            const { player, opponent } = data;
            console.log(data);
            setMatchLog({ player, opponent });
        });

        socket.on('opponent_cpm', (data) => {
            const { cpm } = data;
            setOpponentCpm(cpm);
        });

        socket.on('match_countdown', (data) => {
            const { countdown } = data;
            setMatchCountdown(countdown);
        });

        socket.on('match_remaining_time', (data) => {
            const { matchPlayTime, remainingTime } = data;
            setMatchRemainingTime({ matchPlayTime, remainingTime });
        });

        socket.on('match_result', (data) => {
            const { player, opponent } = data;
            setMatchResult({ player, opponent });
            setStatus('match_result');
        });

        return () => {
            socket.close();
        };
    }, []);

    return {
        socket,
        alarm,
        setAlarm,
        setStatus,
        matchStartTime,
        matchCountdown,
        matchRemainingTime,
        status,
        roomId,
        matchLog,
        matchResult,
        resetGame,
        opponentCpm,
    };
};

export default useSocket;
