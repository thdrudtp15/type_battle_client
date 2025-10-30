import React from 'react';

import type { TypingLogType } from '../../types/typingLog';
import { getAccuracyLog } from '../../lib/util/getAccuracy';
import Progress from './Progress';

type TypingAccuracyProps = {
    log: TypingLogType[];
};

const TypingAccuracy = ({ log }: TypingAccuracyProps) => {
    const logAccuracy = getAccuracyLog(log); // 로그 정확도

    return (
        <Progress value={logAccuracy} color="bg-pink-500">
            <Progress.Title>정확도(%)</Progress.Title>
            <Progress.Value>{logAccuracy.toFixed(2)}%</Progress.Value>
        </Progress>
    );
};

export default React.memo(TypingAccuracy);
