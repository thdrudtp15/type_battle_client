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
    // const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

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
            setStatus('error');
        });

        socket.on('connect_error', () => {
            console.log('연결 실패');
            setStatus('error');
        });

        //==============
        // 매칭 이벤트 핸들러
        //==============
        socket.on('matching', (data) => {
            const { status } = data;
            setStatus(status);
        });

        socket.on('matching_cancel', (data) => {
            const { status } = data;
            setStatus(status);
        });

        socket.on('match_cancelled', (data) => {
            const { reason } = data;
            setAlarm(reason);
            setRoomId(null);
            setOpponentReady(false);
        });

        socket.on('matched', (data) => {
            const { status, roomId } = data;
            setStatus(status);
            setRoomId(roomId);
        });
        socket.on('match_end', (data) => {
            const { status } = data;
            setStatus(status);
        });

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

        socket.on('game_start', () => {
            setStatus('playing');
            setIsGameStarted(true);
        });

        socket.on('game_end', () => {
            setStatus('result');
        });

        socket.on('game_countdown', (data) => {
            const { remainingCount } = data;
            setGameCountdown(remainingCount);
        });

        return () => {
            socket.close();
        };
    }, []);

    return { socket, status, roomId, opponentReady, alarm, setStatus, readyCountdown, gameCountdown, isGameStarted };
};

export default useSocket;
