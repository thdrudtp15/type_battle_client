import React from 'react';
import { motion } from 'framer-motion';

type matchRemainingTimeType = {
    matchPlayTime: number;
    remainingTime: number;
};

const MatchRemainingProgress = React.memo(({ matchPlayTime, remainingTime }: matchRemainingTimeType) => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-8 mb-4">
            <div className="flex flex-col">
                <span className="text-sm text-[#646669] font-mono font-bold mb-2">남은시간</span>
                <span className="text-3xl font-bold text-[#e2b714] font-mono">{remainingTime}s</span>
                <div className="h-2 bg-[#181a1b] rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-[#e2b714] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(remainingTime / matchPlayTime) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </motion.div>
    );
});

export default MatchRemainingProgress;
