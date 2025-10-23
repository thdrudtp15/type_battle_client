import React, { useState, useEffect } from 'react';

type CpmProps = {
    typing: string;
};

// 다시 구현하도록 하자.

const Cpm = ({ typing }: CpmProps) => {
    const [cpm, setCpm] = useState<number>(0);
    const [startTime] = useState<number>(() => Date.now());

    useEffect(() => {
        if (typing.length === 0) {
            return; // ❌ setCpm(0) 제거
        }

        const elapsedMinutes = Math.max((Date.now() - startTime) / 1000 / 60, 0.01);

        const calculatedCpm = Math.round(typing.length / elapsedMinutes);
        setCpm(calculatedCpm);
    }, [typing, startTime]);

    return (
        <div>
            <span>CPM: {cpm}</span>
        </div>
    );
};

export default React.memo(Cpm);
