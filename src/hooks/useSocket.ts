import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

import type { SocketStatus } from '../types/socketStatus';

const useSocket = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [status, setStatus] = useState<SocketStatus>('disconnected');

    useEffect(() => {
        const socket = io('http://localhost:3001', {
            reconnection: true, // 재연결 여부
            reconnectionAttempts: 5, // 재연결 시도 횟수
            reconnectionDelay: 1000, // 재연결 딜레이
            reconnectionDelayMax: 5000, // 재연결 딜레이 최대값
        });

        setSocket(socket);

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

        socket.on('matched', (data) => {
            const { status } = data;
            setStatus(status);
        });

        return () => {
            socket.close();
        };
    }, []);

    return { socket, status };
};

export default useSocket;
