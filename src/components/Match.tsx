import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

import Modal from './ui/Modal';

import { THROTTLE_TIME } from '../constants/constants';

import type { Socket } from 'socket.io-client';
import type { TypingLogType } from '../types/typingLog';
import type { RefObject } from 'react';
import type { SocketStatus } from '../types/socketStatus';

type matchRemainingTimeType = {
    matchPlayTime: number;
    remainingTime: number;
};

type MatchProps = {
    matchRemainingTime: matchRemainingTimeType;
    sentence: string[];
    socket: Socket;
    roomId: string | null;
    status: SocketStatus;
    setStatus: (status: SocketStatus) => void;
};

const MatchRemainingProgress = React.memo(({ matchPlayTime, remainingTime }: matchRemainingTimeType) => {
    return (
        <>
            <span className="text-3xl font-bold text-[#e2b714] font-mono">{remainingTime}s</span>
            <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-[#e2b714] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(remainingTime / matchPlayTime) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </>
    );
});

const Input = React.memo(
    ({
        setInput,
        inputRef,
        handleComplete,
    }: {
        setInput: (input: string) => void;
        inputRef: RefObject<HTMLInputElement | null>;
        handleComplete: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    }) => {
        return (
            <motion.input
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-[#2c2e31] border-2 border-[#646669] 
                               rounded-xl p-4 text-[#d1d0c5] text-2xl font-mono 
                               focus:border-[#e2b714] focus:outline-none transition-colors"
                type="text"
                placeholder="여기에 입력하세요..."
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={handleComplete}
                ref={inputRef}
            />
        );
    }
);

const Match = ({ matchRemainingTime, sentence, socket, roomId, status, setStatus }: MatchProps) => {
    const { matchPlayTime, remainingTime } = matchRemainingTime;

    const inputRef = useRef<HTMLInputElement>(null);
    const lastEmitTimeRef = useRef<number>(0);

    const [input, setInput] = useState<string>('');
    const [log, setLog] = useState<TypingLogType[]>([]);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
    // const [keyDownCount, setKeyDownCount] = useState<number>(0);

    //==============
    // 입력 카운트 핸들러
    //==============
    useEffect(() => {
        const now = Date.now();
        const timeSinceLastEmit = now - lastEmitTimeRef.current;
        if (timeSinceLastEmit >= THROTTLE_TIME) {
            socket.emit('accuracy', roomId);
            socket.emit('cpm', roomId);
            lastEmitTimeRef.current = now;
        }
    }, [input]);

    //==============
    // 로그 전송 핸들러
    //==============
    useEffect(() => {
        if (log.length === 0) return;
        // 로그 전송
        socket.emit('log', roomId, log);
    }, [log, setLog]);

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

    return (
        <div className="bg-[#323437] flex items-center justify-center">
            <div className="w-full">
                {/* Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-8 mb-2"
                >
                    <div className="flex flex-col">
                        <span className="text-sm text-[#646669] font-mono mb-1">남은시간</span>
                        <MatchRemainingProgress matchPlayTime={matchPlayTime} remainingTime={remainingTime} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#646669] font-mono mb-1">정확도</span>
                        <span className="text-3xl font-bold text-[#e2b714] font-mono">100%</span>
                    </div>
                </motion.div>

                {/* Players Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex gap-4 w-full mb-10"
                >
                    {/* Player 1 */}
                    <div className="flex-1 bg-[#2c2e31] rounded-xl p-5 border-2 border-[#e2b714]">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[#d1d0c5] font-mono font-bold">나</span>
                            <span className="text-[#e2b714] font-mono font-bold">0 WPM</span>
                        </div>
                        <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#e2b714] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '45%' }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Player 2 */}
                    <div className="flex-1 bg-[#2c2e31] rounded-xl p-5 border-2 border-[#646669]">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[#d1d0c5] font-mono font-bold">상대</span>
                            <span className="text-[#d1d0c5] font-mono font-bold">0 WPM</span>
                        </div>
                        <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#646669] rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: '30%' }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Text Display */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#2c2e31] rounded-xl p-10 mb-6 min-h-[200px] flex items-center"
                >
                    <p className="text-3xl font-mono text-[#646669] leading-relaxed">
                        {sentence[currentSentenceIndex]}
                    </p>
                </motion.div>

                {/* Input */}
                <Input setInput={setInput} inputRef={inputRef} handleComplete={handleComplete} />
            </div>
            <Modal isOpen={status === 'match_result'} onClose={() => setStatus('connected')}>
                결과!
            </Modal>
        </div>
    );
};

export default Match;
