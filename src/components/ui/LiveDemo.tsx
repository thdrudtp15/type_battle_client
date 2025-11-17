import { motion } from 'framer-motion';

import { useRef, useEffect, useState } from 'react';

import Input from '../game/Input';
import MatchRemainingProgress from '../game/MatchRemainingProgress';
import Players from '../game/Players';
import Sentence from '../game/Sentence';

const SENTENCES = ['캐리비안의 해적', '은밀하게 위대하게', '모두의 마블', '왕의 검'];

const LiveDemo = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [remainingTime, setRemainingTime] = useState<number>(30);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
    const [input, setInput] = useState<string>('');
    const [player, setPlayer] = useState<{ accuracy: number; score: number; progress: number }>({
        accuracy: 75,
        score: 100,
        progress: 0,
    });
    const [opponent, setOpponent] = useState<{ accuracy: number; score: number; progress: number }>({
        accuracy: 75,
        score: 100,
        progress: 0,
    });

    useEffect(() => {
        const remainingTimeInterval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev <= 0) {
                    // 시간 종료 시 모든 상태 리셋
                    setCurrentSentenceIndex(0);
                    setInput('');
                    setPlayer({ accuracy: 75, score: 100, progress: 0 });
                    setOpponent({ accuracy: 75, score: 100, progress: 0 });
                    return 30;
                }
                return prev - 1;
            });
        }, 1000);
        return () => {
            clearInterval(remainingTimeInterval);
        };
    }, []);

    useEffect(() => {
        // remainingTime이 0보다 클 때만 타이핑 진행
        if (remainingTime <= 0) return;

        const inputInterval = setInterval(() => {
            setInput((prev) => {
                const currentSentence = SENTENCES[currentSentenceIndex];
                if (prev.length < currentSentence.length) {
                    return prev + currentSentence[prev.length];
                }
                return prev;
            });
        }, 200);

        return () => {
            clearInterval(inputInterval);
        };
    }, [currentSentenceIndex, remainingTime]);

    useEffect(() => {
        // remainingTime이 0보다 클 때만 문장 완료 처리
        if (remainingTime <= 0) return;

        if (input === SENTENCES[currentSentenceIndex]) {
            setCurrentSentenceIndex((prev) => {
                if (prev === SENTENCES.length - 1) return 0;
                else return prev + 1;
            });
            setPlayer((prev) => {
                return {
                    accuracy: Math.round(100 - Math.random() * 15),
                    score: (prev.score + 95) % 600,
                    progress: (prev.progress + 7.5) % 100,
                };
            });
            setInput('');
        }
    }, [input, remainingTime, currentSentenceIndex]);

    useEffect(() => {
        const opponentTimeout = setTimeout(() => {
            setOpponent((prev) => {
                return {
                    accuracy: Math.round(100 - Math.random() * 15),
                    score: (prev.score + 85) % 600,
                    progress: (prev.progress + 7.5) % 100,
                };
            });
        }, 1500);

        return () => clearTimeout(opponentTimeout);
    }, [player.progress]);

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-modal-dark rounded-xl  w-full hidden md:block p-2"
        >
            <div className="">
                <MatchRemainingProgress matchPlayTime={30} remainingTime={remainingTime} />
                <Players>
                    <Players.Player focus={true}>
                        <Players.Accuracy accuracy={player.accuracy} />
                        <Players.Score score={player.score} />
                        <Players.Progress progress={player.progress} />
                    </Players.Player>
                    <Players.Player>
                        <Players.Accuracy accuracy={opponent.accuracy} />
                        <Players.Score score={opponent.score} />
                        <Players.Progress progress={opponent.progress} />
                    </Players.Player>
                </Players>
                <Sentence input={input} isCompleted={false} sentence={SENTENCES[currentSentenceIndex]} />
                <Input
                    inputRef={inputRef}
                    handleComplete={() => {}}
                    handleKeyDown={() => {}}
                    disabled={true}
                    placeholder={'미리보기'}
                />
            </div>
        </motion.div>
    );
};

export default LiveDemo;
