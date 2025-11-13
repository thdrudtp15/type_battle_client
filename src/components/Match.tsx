import React, { useEffect, useState, useRef } from 'react';

import Modal from './ui/Modal';
import MatchRemainingProgress from './game/MatchRemainingProgress';
import Input from './game/Input';
import Sentence from './game/Sentence';

import { THROTTLE_TIME } from '../constants/constants';

import type { Socket } from 'socket.io-client';
import type { TypingLogType } from '../types/typingLog';

import type { SocketStatus } from '../types/socketStatus';
import Players from './game/Players';

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
    gameStartTime: number | null;
};

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
        <div className="flex items-center justify-center">
            <div className="w-full">
                <MatchRemainingProgress matchPlayTime={matchPlayTime} remainingTime={remainingTime} />
                <Players />
                <Sentence sentence={sentence} currentSentenceIndex={currentSentenceIndex} />
                <Input setInput={setInput} inputRef={inputRef} handleComplete={handleComplete} />
            </div>
            <Modal isOpen={status === 'match_result'} onClose={() => setStatus('connected')}>
                결과!
            </Modal>
        </div>
    );
};

export default Match;
