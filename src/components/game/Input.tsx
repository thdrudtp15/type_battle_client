import React from 'react';
import { motion } from 'framer-motion';
import type { RefObject } from 'react';

const Input = React.memo(
    ({
        // setInput,
        inputRef,
        handleComplete,
        handleKeyDown,
        isCompleted,
    }: {
        // setInput: (input: string) => void;
        inputRef: RefObject<HTMLInputElement | null>;
        handleComplete: (e: React.KeyboardEvent<HTMLInputElement>) => void;
        handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
        isCompleted: boolean;
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
                placeholder={`${isCompleted ? '상대방 입력을 기다려 주세요' : '여기에 입력하세요...'}`}
                autoFocus
                disabled={isCompleted}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleKeyDown(e as unknown as React.KeyboardEvent<HTMLInputElement>);
                }}
                onKeyDown={handleComplete}
                ref={inputRef}
            />
        );
    }
);
export default Input;
