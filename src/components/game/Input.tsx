import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { RefObject } from 'react';

type InputProps = {
    inputRef: RefObject<HTMLInputElement | null>;
    handleComplete: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled: boolean;
    placeholder: string;
};

const Input = React.memo(
    ({
        // setInput,
        inputRef,
        handleComplete,
        handleKeyDown,
        disabled,
        placeholder,
    }: InputProps) => {
        useEffect(() => {
            if (!disabled) inputRef.current?.focus();
            else inputRef.current?.blur();
        }, [disabled, inputRef]);

        return (
            <motion.input
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-gray-900/50 border border-2 border-gray-700 
                               rounded-xl p-4 text-[#d1d0c5] text-2xl font-mono 
                               focus:border-[#e2b714] focus:outline-none transition-colors"
                type="text"
                placeholder={placeholder}
                autoFocus
                disabled={disabled}
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
