import React from 'react';
import { motion } from 'framer-motion';

import type { Players as PlayersType } from '../../types/players';

const CPM = React.memo(() => {
    return (
        <>
            <div className="flex items-center justify-between mb-3">
                <span className="text-[#d1d0c5] font-mono font-bold">타수(타/분)</span>
                <span className="text-[#e2b714] font-mono font-bold">450</span>
            </div>
            <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden mb-3">
                <motion.div
                    className="h-full bg-[#e2b714] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 45 }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </>
    );
});

const Accuracy = React.memo(({ accuracy }: { accuracy: number }) => {
    return (
        <>
            <div className="flex justify-between">
                <span className="text-[#d1d0c5] font-mono font-bold">정확도</span>
                <span className="text-[#e2b714] font-mono font-bold">{accuracy} %</span>
            </div>
        </>
    );
});

const Score = React.memo(({ score }: { score: number }) => {
    return (
        <>
            <div className="flex justify-between">
                <span className="text-[#d1d0c5] font-mono font-bold">점수</span>
                <span className="text-[#e2b714] font-mono font-bold">{score} P</span>
            </div>
        </>
    );
});

const Progress = React.memo(({ progress }: { progress: number }) => {
    return (
        <div className="flex justify-between">
            <span className="text-[#d1d0c5] font-mono font-bold">진행도</span>
            <span className="text-[#e2b714] font-mono font-bold">{progress ? progress : 0}%</span>
        </div>
    );
});

type PlayersProps = {
    matchLog: {
        player: PlayersType;
        opponent: PlayersType;
    } | null;
};

const Players = React.memo(({ matchLog }: PlayersProps) => {
    return (
        <div className="flex flex-col">
            <p className="mb-4 text-sm text-[#646669] font-mono font-bold">진행 상황</p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-4 w-full mb-10"
            >
                {/* Player 1 */}
                <div className="flex-1 bg-[#2c2e31] rounded-xl p-5 border-2 border-[#e2b714]">
                    <CPM />
                    <Accuracy accuracy={matchLog?.player?.accuracy ?? 0} />
                    <Score score={matchLog?.player?.point ?? 0} />
                    <Progress progress={matchLog?.player?.progress ?? 0} />
                </div>

                {/* Player 2 */}
                <div className="flex-1 bg-[#2c2e31] rounded-xl p-5 border-2 border-[#646669]">
                    <CPM />
                    <Accuracy accuracy={matchLog?.opponent?.accuracy ?? 0} />
                    <Score score={matchLog?.opponent?.point ?? 0} />
                    <Progress progress={matchLog?.opponent?.progress ?? 0} />
                </div>
            </motion.div>
        </div>
    );
});
export default Players;
