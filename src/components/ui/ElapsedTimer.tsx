import React, { useState, useEffect } from 'react';
import { getTime } from '../../lib/util/getTime';

const ElapsedTimer = ({ startTime }: { startTime: number | null }) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        if (startTime === null) return;

        const interval = setInterval(() => {
            setElapsedTime(Date.now() - startTime);
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime]);

    if (startTime === null) return null;

    const { minutes, seconds } = getTime(elapsedTime);

    return (
        <div>
            <span>
                {minutes}분 {seconds}초 경과
            </span>
        </div>
    );
};

export default React.memo(ElapsedTimer);
