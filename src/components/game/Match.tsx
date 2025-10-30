import { useState, useEffect, useRef, useCallback } from 'react';
import TypingLog from '../ui/TypingLog';
import Input from '../ui/Input';
import ComparisonText from '../ui/ComparisonText';
import TypingSpeed from '../ui/TypingSpeed';
import Countdown from '../ui/Countdown';
import ElapsedTimer from '../ui/ElapsedTimer';
import TypingAccuracy from '../ui/TypingAccuracy';

import { useNavigate } from 'react-router-dom';
import { getTime } from '../../lib/util/getTime';
import { calculateResult } from '../../lib/util/calculateResult';

import { SENTENCE } from '../../constants/test';

import type { TypingLogType } from '../../types/typingLog';

const Match: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [typing, setTyping] = useState<string>('');
    const [sentenceIndex, setSentenceIndex] = useState<number>(0);
    const [log, setLog] = useState<TypingLogType[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [keyDownCount, setKeyDownCount] = useState<number>(0);

    const navigate = useNavigate();

    const onStart = useCallback(() => {
        setStartTime(Date.now());
    }, []);

    //==============
    // 문장 입력 완료
    //==============
    const handleNext = useCallback(() => {
        if (isComplete) return;

        // 로그 추가
        setLog((prev) => [
            ...prev,
            {
                sentence: SENTENCE[sentenceIndex],
                typing,
            },
        ]);

        // 마지막 문장이면 게임 종료
        if (sentenceIndex === SENTENCE.length - 1) {
            setIsComplete(true);
            setEndTime(Date.now());
            return;
        }

        // 다음 문장으로
        setSentenceIndex((prev) => prev + 1);
        setTyping('');
    }, [isComplete, sentenceIndex, typing]);

    //==============
    // 키 다운 핸들러 (분리)
    //==============
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (isComplete) return;

            // 백스페이스와 엔터는 카운트 제외
            if (e.key !== 'Enter' && e.key !== 'Backspace') {
                setKeyDownCount((prev) => prev + 1);
            }

            // 엔터키 처리
            if (e.key === 'Enter') {
                // 문장 길이가 일치하지 않으면 무시
                if (typing.length !== SENTENCE[sentenceIndex].length) return;

                handleNext();
            }
        },
        [isComplete, typing.length, sentenceIndex, handleNext]
    );

    //==============
    // 게임 끝
    //==============
    useEffect(() => {
        if (isComplete && startTime && endTime) {
            const { elapsedTime, totalTime } = calculateResult(log, startTime, endTime);

            const { minutes: elapsedMinutes, seconds: elapsedSeconds } = getTime(elapsedTime);
            const { minutes: penaltyMinutes, seconds: penaltySeconds } = getTime(totalTime);

            console.log('경과 시간:', `${elapsedMinutes}분 ${elapsedSeconds}초`);
            console.log('최종 시간:', `${penaltyMinutes}분 ${penaltySeconds}초`);

            navigate('/result');
        }
    }, [isComplete, startTime, endTime, log, navigate]);

    //==============
    // 게임 시작 시 input 포커싱
    //==============
    useEffect(() => {
        if (startTime) {
            inputRef.current?.focus();
        }
    }, [startTime]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            {/**통계 */}
            <div className="absolute top-4" id="stats">
                <ElapsedTimer startTime={startTime} />
                <TypingSpeed startTime={startTime ?? 0} keyDownCount={keyDownCount} />
                <TypingAccuracy log={log} />
            </div>

            <Countdown onStart={onStart} />
            <TypingLog log={log} />
            <ComparisonText sentence={SENTENCE[sentenceIndex]} text={typing} />

            <Input
                className="mt-5"
                value={typing}
                onChange={(e) => setTyping(e.target.value)}
                placeholder=""
                onKeyDown={handleKeyDown}
                disabled={!startTime}
                ref={inputRef}
            />
        </div>
    );
};

export default Match;
