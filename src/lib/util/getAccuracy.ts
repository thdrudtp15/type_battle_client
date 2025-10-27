import type { TypingLogType } from '../../types/typingLog';

export const getAccuracyLog = (log: TypingLogType[]) => {
    // 타이핑에서 점수를 구함
    let totalCorrect = 0; // 맞은 글자 수
    let totalTyped = 0; // 총 입력한 글자 수

    log.forEach((item) => {
        const correctChars = item.typing.split('').filter((char, index) => char === item.sentence[index]).length;

        totalCorrect += correctChars;
        totalTyped += item.typing.length;
    });

    return totalTyped > 0 ? Math.round((totalCorrect / totalTyped) * 100) : 0;
};

export const getAccuracy = (sentence: string, typing: string) => {
    const ok = typing.split('').filter((char, index) => char === sentence[index]).length;
    const totalChar = typing.length;
    return Math.round((ok / totalChar) * 100) || 0;
};
