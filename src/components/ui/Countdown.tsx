import React, { useState, useEffect } from 'react';

import { COUNTDOWN_TIME } from '../../constants/constants';

const Countdown = ({ onStart }: { onStart: () => void }) => {
    const [count, setCount] = useState<number>(COUNTDOWN_TIME);

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
    }, [count, onStart]);

    return (
        <div>
            <span>{count > 0 ? count : '시작!'}</span>
        </div>
    );
};

export default React.memo(Countdown);
