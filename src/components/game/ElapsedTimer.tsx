import React, { useState, useEffect } from 'react';

const ElapsedTimer = ({ startTime }: { startTime: number | null }) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime === null) return;
            setElapsedTime(Date.now() - startTime);
        }, 1000);
        return () => clearInterval(interval);
    }, [startTime]);

    if (startTime === null) return null;

    return (
        <div>
            <span>
                {Math.floor(elapsedTime / 60000)
                    .toString()
                    .padStart(2, '0')}
                분{' '}
                {Math.floor((elapsedTime % 60000) / 1000)
                    .toString()
                    .padStart(2, '0')}
                초 경과
            </span>
        </div>
    );
};

export default React.memo(ElapsedTimer);
