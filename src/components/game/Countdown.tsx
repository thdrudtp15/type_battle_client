import React, { useState, useEffect } from 'react';

const Countdown = ({ onStart }: { onStart: () => void }) => {
    const [count, setCount] = useState<number>(3);

    useEffect(() => {
        const interval = setInterval(() => {
            if (count === 0) {
                onStart();
                clearInterval(interval);
                return;
            }
            setCount(count - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [count]);

    return (
        <div>
            <span>{count > 0 ? count : '시작!'}</span>
        </div>
    );
};

export default React.memo(Countdown);
