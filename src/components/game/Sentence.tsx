import React from 'react';
import { motion } from 'framer-motion';

type SentenceProps = {
    sentence: string[];
    currentSentenceIndex: number;
};

const Sentence = React.memo(({ sentence, currentSentenceIndex }: SentenceProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#2c2e31] rounded-xl p-10 mb-6 min-h-[200px] flex items-center"
        >
            <p className="text-3xl font-mono text-[#646669] leading-relaxed">{sentence[currentSentenceIndex]}</p>
        </motion.div>
    );
});
export default Sentence;
