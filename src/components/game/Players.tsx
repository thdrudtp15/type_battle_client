import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import AnimateNumber from '../ui/AnimateNumber';

import { THROTTLE_TIME } from '../../constants/constants';
import { getCpm } from '../../lib/util/getCpm';

import type { Socket } from 'socket.io-client';

type CpmProps = {
    keyDownCount?: number;
    matchStartTime?: number | null;
    socket?: Socket;
    roomId?: string | null;
    opponentCpm?: number;
    isCompleted?: boolean;
};

const Cpm = React.memo(({ keyDownCount, matchStartTime, socket, roomId, opponentCpm, isCompleted }: CpmProps) => {
    const lastEmitTimeRef = useRef<number>(0);
    const [cpm, setCpm] = useState(0);

    // 최대 CPM 기준 설정 (게이지 100% 기준)
    const MAX_CPM = 1200; // 또는 600, 자유롭게 조정

    //==============
    // CPM 계산
    //==============
    useEffect(() => {
        if (!matchStartTime || !keyDownCount || isCompleted) return;

        if (keyDownCount > 0) {
            setCpm(getCpm(keyDownCount, matchStartTime));
        }

        const interval = setInterval(() => {
            setCpm(getCpm(keyDownCount, matchStartTime));
        }, 500);

        return () => clearInterval(interval);
    }, [keyDownCount, isCompleted, matchStartTime]);

    //==============
    // CPM 전송
    //==============
    useEffect(() => {
        if (!socket || !roomId || !matchStartTime) return;

        if (isCompleted) {
            socket.emit('match_cpm', roomId, cpm);
            return;
        }

        const now = Date.now();
        const timeSinceLastEmit = now - lastEmitTimeRef.current;

        if (timeSinceLastEmit >= THROTTLE_TIME) {
            socket.emit('match_cpm', roomId, cpm);
            lastEmitTimeRef.current = now;
        }
    }, [cpm, isCompleted, socket, roomId, matchStartTime]);

    const getGaugePercent = (cpm: number) => {
        return Math.min((cpm / MAX_CPM) * 100, 100);
    };

    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[#d1d0c5] font-mono font-bold">타수(타/분)</span>
                <span className="text-[#e2b714] font-mono font-bold">{opponentCpm || cpm}</span>
            </div>

            {/* 내 게이지 */}
            <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden mb-3">
                <motion.div
                    className="h-full bg-[#e2b714] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getGaugePercent(opponentCpm || cpm)}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                />
            </div>
        </>
    );
});

const Accuracy = React.memo(({ accuracy }: { accuracy: number }) => {
    return (
        <>
            <div className="flex justify-between">
                <span className="text-[#d1d0c5] font-mono font-bold">정확도</span>
                <AnimateNumber value={accuracy} className="text-[#e2b714] font-mono font-bold" prefix="%" />
            </div>
        </>
    );
});

const Score = React.memo(({ score }: { score: number }) => {
    return (
        <>
            <div className="flex justify-between">
                <span className="text-[#d1d0c5] font-mono font-bold">점수</span>
                <AnimateNumber value={score} className="text-[#e2b714] font-mono font-bold" prefix="P" />
            </div>
        </>
    );
});

const Progress = React.memo(({ progress }: { progress: number }) => {
    return (
        <div className="flex justify-between">
            <span className="text-[#d1d0c5] font-mono font-bold">진행도</span>
            <AnimateNumber value={progress ? progress : 0} className="text-[#e2b714] font-mono font-bold" prefix="%" />
        </div>
    );
});

const PlayersWrap = React.memo(({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col">
            <p className="mb-4 text-sm text-[#646669] font-mono font-bold">진행 상황</p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-4 w-full mb-10"
            >
                {children}
            </motion.div>
        </div>
    );
});

const Player = React.memo(({ children, focus = false }: { children: React.ReactNode; focus?: boolean }) => {
    return (
        <div
            className={`flex-1 bg-gray-900/50 rounded-xl p-5 border border-2 ${
                focus ? 'border-yellow-500' : 'border-gray-500'
            }`}
        >
            <p className="text-sm text-[#646669] font-mono font-bold mb-2">{focus ? '나' : '상대'}</p>
            {children}
        </div>
    );
});

const Players = Object.assign(React.memo(PlayersWrap), {
    Player,
    Cpm,
    Accuracy,
    Score,
    Progress,
});

export default Players;
