import React, { useState, useEffect } from 'react';

type WpmProps = {
    typing: string;
};

// 현재 WPM 구하는 공식은 임의
// 추후에 로직 개선하기

const Wpm = ({ typing }: WpmProps) => {
    const [wpm, setWpm] = useState<number>(0);
    const [startTime] = useState<number>(() => Date.now());

    useEffect(() => {
        if (typing.length === 0) {
            setWpm(0);
            return;
        }

        const elapsedMinutes = Math.max(
            (Date.now() - startTime) / 1000 / 60,
            0.01 // 최소 0.6초
        );
        const characters = typing.length;
        const calculatedWpm = Math.round(characters / 5 / elapsedMinutes);
        setWpm(calculatedWpm);
    }, [typing, startTime]);

    return (
        <div>
            <span>WPM: {wpm}</span>
        </div>
    );
};

export default React.memo(Wpm);
