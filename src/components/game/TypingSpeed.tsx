import React, { useState, useEffect, useCallback } from 'react';
import Progress from '../ui/Progress';

type TypingSpeedProps = {
    startTime: number;
    keyDownCount: number;
};

const TypingSpeed = ({ startTime, keyDownCount }: TypingSpeedProps) => {
    const [cpm, setCpm] = useState(0);

    // getCpm을 useCallback으로 메모이제이션
    const getCpm = useCallback(() => {
        if (!startTime) {
            setCpm(0);
            return;
        }

        const elapsedMinutes = (Date.now() - startTime) / 1000 / 60;
        const currentCpm = elapsedMinutes > 0 ? Math.round(keyDownCount / elapsedMinutes) : 0;
        setCpm(currentCpm);
    }, [startTime, keyDownCount]);

    useEffect(() => {
        getCpm(); // 즉시 실행

        // 실시간 업데이트
        const interval = setInterval(getCpm, 500);

        return () => clearInterval(interval);
    }, [getCpm]);

    return (
        <Progress value={cpm} color="bg-pink-500">
            <Progress.Title>타수(타/분)</Progress.Title>
            <Progress.Value>{cpm}타/분</Progress.Value>
        </Progress>
    );
};

export default React.memo(TypingSpeed);
