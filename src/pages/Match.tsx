import { useState, useEffect, useRef } from 'react';
import TypingLog from '../components/game/TypingLog';
import Input from '../components/ui/Input';
import Cpm from '../components/game/Cpm';
import ComparisonText from '../components/ui/ComparisonText';
import Countdown from '../components/game/Countdown';
import ElapsedTimer from '../components/game/ElapsedTimer';
import { useNavigate } from 'react-router-dom';

import type { TypingLogType } from '../types/typingLog';

const SENTENCE = ['안녕하세요 반가워요', '오늘은 날씨가 좋네요'];

const Match: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [typing, setTyping] = useState<string>('');
    const [sentenceIndex, setSentenceIndex] = useState<number>(0);
    const [log, setLog] = useState<TypingLogType[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<number | null>(null);

    const navigate = useNavigate();

    //==============
    // 문장 입력 완료
    //==============
    const handleEnter = () => {
        if (isComplete) return;

        setLog((prev) => {
            return [...prev, { sentence: SENTENCE[sentenceIndex], typing }];
        });

        if (sentenceIndex === SENTENCE.length - 1) {
            setIsComplete(true);
            return;
        }

        setSentenceIndex(sentenceIndex + 1);
        setTyping('');
    };

    //==============
    // 게임 끝
    //==============
    useEffect(() => {
        if (isComplete) {
            // 두 플레이어가 모두 완료 되면 결과 페이지로 이동
            navigate('/result');
        }
    }, [isComplete]);

    //==============
    // 게임 시작 시 input 포커싱
    //==============
    useEffect(() => {
        if (startTime) {
            inputRef.current?.focus();
        }
    }, [startTime]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <Countdown onStart={() => setStartTime(Date.now())} />
            <ElapsedTimer startTime={startTime} />
            <TypingLog log={log} />
            <Cpm typing={typing} />
            <ComparisonText sentence={SENTENCE[sentenceIndex]} typing={typing} />
            <Input
                className="mt-5"
                value={typing}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTyping(e.target.value);
                }}
                placeholder=""
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleEnter()}
                disabled={!startTime}
                ref={inputRef}
            ></Input>
        </div>
    );
};

export default Match;
