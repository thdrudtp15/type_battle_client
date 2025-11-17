import { PENALTY_TIME } from '../../constants/constants';
import type { TypingLogType } from '../../types/typingLog';

export const calculateResult = (log: TypingLogType[], startTime: number, endTime: number) => {
    const failedCount = log.reduce((acc, item) => {
        return acc + item.sentence.split('').filter((char, i) => char !== item.typing[i]).length;
    }, 0);

    const elapsedTime = endTime - startTime;
    const penaltyTime = failedCount * PENALTY_TIME;
    const totalTime = elapsedTime + penaltyTime;

    return { failedCount, elapsedTime, penaltyTime, totalTime };
};
