import React from 'react';
import { motion } from 'framer-motion';
import type { RefObject } from 'react';

const Input = React.memo(
    ({
        setInput,
        inputRef,
        handleComplete,
    }: {
        setInput: (input: string) => void;
        inputRef: RefObject<HTMLInputElement | null>;
        handleComplete: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    }) => {
        return (
            <motion.input
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-[#2c2e31] border-2 border-[#646669] 
                               rounded-xl p-4 text-[#d1d0c5] text-2xl font-mono 
                               focus:border-[#e2b714] focus:outline-none transition-colors"
                type="text"
                placeholder="여기에 입력하세요..."
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyDown={handleComplete}
                ref={inputRef}
            />
        );
    }
);
export default Input;
