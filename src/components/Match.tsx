import React, { useEffect, useState, useRef, useCallback } from 'react';

import MatchRemainingProgress from './game/MatchRemainingProgress';
import Input from './game/Input';
import Sentence from './game/Sentence';
import Players from './game/Players';

import { THROTTLE_TIME } from '../constants/constants';

import type { Socket } from 'socket.io-client';
import type { TypingLogType } from '../types/typingLog';
import type { Players as PlayersType } from '../types/players';

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
};

const Match = ({ matchRemainingTime, socket, roomId, matchLog, children }: MatchProps) => {
    const { player } = matchLog || {};
    const { sentence, isCompleted } = player || { sentence: '', isCompleted: false };
    const { matchPlayTime, remainingTime } = matchRemainingTime;

    const inputRef = useRef<HTMLInputElement>(null);
    const lastEmitTimeRef = useRef<number>(0);

    const [input, setInput] = useState<string>('');
    const [log, setLog] = useState<TypingLogType[]>([]);

    const [keyDownCount, setKeyDownCount] = useState<number>(0);

    //==============
    // 입력 카운트 핸들러
    //==============
    useEffect(() => {
        const now = Date.now();
        const timeSinceLastEmit = now - lastEmitTimeRef.current;
        if (timeSinceLastEmit >= THROTTLE_TIME) {
            socket.emit('match_cpm', roomId);
            lastEmitTimeRef.current = now;
        }
    }, [input]);

    //==============
    // 로그 전송 핸들러
    //==============
    useEffect(() => {
        if (log.length === 0) return;
        // 로그 전송 (정확도는 서버에서 계산.)

        socket.emit('match_log', roomId, log);
    }, [log, setLog]);

    //==============
    // 입력 완료 핸들러
    //==============
    const handleComplete = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && input.length === sentence.length) {
                console.log('보내기!');
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
        },
        [setLog, inputRef, sentence, input]
    );

    //==============
    // 키 다운운 핸들러
    //==============
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            const prevValue = input;
            const currentValue = e.currentTarget.value;
            if (prevValue.length < currentValue.length) {
                setKeyDownCount(keyDownCount + 1);
            }
            setInput(currentValue);
        },
        [keyDownCount, input]
    );

    return (
        <div className="flex items-center justify-center">
            <div className="w-full">
                <MatchRemainingProgress matchPlayTime={matchPlayTime} remainingTime={remainingTime} />
                <Players matchLog={matchLog} />
                <Sentence sentence={sentence} input={input} isCompleted={isCompleted} />
                <Input
                    handleKeyDown={handleKeyDown}
                    inputRef={inputRef}
                    handleComplete={handleComplete}
                    isCompleted={isCompleted}
                />
            </div>
            <>{children}</>
        </div>
    );
};

export default Match;
