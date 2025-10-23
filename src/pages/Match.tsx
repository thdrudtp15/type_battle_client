import { useState, useEffect } from 'react';
import TypingLog from '../components/game/TypingLog';
import Input from '../components/ui/Input';
import Wpm from '../components/game/Wpm';
import ComparisonText from '../components/ui/ComparisonText';
import { useNavigate } from 'react-router-dom';

import type { TypingLogType } from '../types/typingLog';

const SENTENCE = ['안녕하세요 반가워요', '오늘은 날씨가 좋네요'];

const Match: React.FC = () => {
    const [typing, setTyping] = useState<string>('');
    const [sentenceIndex, setSentenceIndex] = useState<number>(0);
    const [log, setLog] = useState<TypingLogType[]>([]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const navigate = useNavigate();

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

    useEffect(() => {
        if (isComplete) {
            // 두 플레이어가 모두 완료 되면 결과 페이지로 이동
            navigate('/result');
        }
    }, [isComplete]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <TypingLog log={log} />
            <Wpm typing={typing} />
            <ComparisonText sentence={SENTENCE[sentenceIndex]} typing={typing} />
            <Input
                className="mt-5"
                value={typing}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setTyping(e.target.value);
                }}
                placeholder=""
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleEnter()}
            ></Input>
        </div>
    );
};

export default Match;
