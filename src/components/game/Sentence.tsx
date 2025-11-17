import React from 'react';
import { motion } from 'framer-motion';

type SentenceProps = {
    sentence: string;
    input: string;
    isCompleted: boolean;
};

const Sentence = React.memo(({ sentence, input, isCompleted }: SentenceProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-900/50 border border-2 border-gray-700 rounded-xl p-10 mb-6 min-h-[200px] flex items-center"
        >
            {!isCompleted ? (
                <p className="text-3xl font-mono text-[#646669] leading-relaxed">
                    {sentence.split('').map((char, index) => {
                        return (
                            <span
                                key={index}
                                className={`${
                                    !input[index] || input[index] === ' '
                                        ? 'text-[#646669]'
                                        : input[index] === char
                                        ? 'text-white'
                                        : 'text-red-500 underline'
                                }`}
                            >
                                {char}
                            </span>
                        );
                    })}
                </p>
            ) : (
                <p className="text-3xl font-mono text-[#646669] leading-relaxed">모든 문장 작성 완료</p>
            )}
        </motion.div>
    );
});
export default Sentence;
