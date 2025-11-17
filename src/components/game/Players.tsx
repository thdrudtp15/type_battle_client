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

    //==============
    // CPM 계산
    //==============
    useEffect(() => {
        if (!matchStartTime || !keyDownCount || isCompleted) return;
        // 즉시 CPM 계산
        if (keyDownCount > 0) {
            setCpm(getCpm(keyDownCount, matchStartTime));
        }

        // 입력이 멈춰도 시간은 흐르므로 계속 업데이트
        const interval = setInterval(() => {
            setCpm(getCpm(keyDownCount, matchStartTime));
        }, 500);

        return () => clearInterval(interval);
    }, [keyDownCount, isCompleted]);

    //==============
    // CPM 전송
    //==============
    useEffect(() => {
        if (!socket || !roomId || !matchStartTime) return;
        else if (isCompleted) {
            // 게임 종료 시 마지막으로 cpm 전송
            socket.emit('match_cpm', roomId, cpm);
        }
        const now = Date.now();
        const timeSinceLastEmit = now - lastEmitTimeRef.current;
        if (timeSinceLastEmit >= THROTTLE_TIME) {
            if (cpm < 1) console.log('오류 발생!');

            socket.emit('match_cpm', roomId, cpm);
            lastEmitTimeRef.current = now;
        }
    }, [cpm, isCompleted]);

    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[#d1d0c5] font-mono font-bold">타수(타/분)</span>
                <span className="text-[#e2b714] font-mono font-bold">{opponentCpm || cpm}</span>
            </div>
            <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden mb-3">
                <motion.div
                    className="h-full bg-[#e2b714] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 45 }}
                    transition={{ duration: 0.5 }}
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

const Player = React.memo(({ children }: { children: React.ReactNode }) => {
    return <div className="flex-1 bg-gray-900/50 rounded-xl p-5 border border-2 border-yellow-500">{children}</div>;
});

const Players = Object.assign(React.memo(PlayersWrap), {
    Player,
    Cpm,
    Accuracy,
    Score,
    Progress,
});

export default Players;
