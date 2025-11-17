import { motion } from 'framer-motion';
import React from 'react';

const Button = ({
    children,
    onClick,
    disabled,
    className,
}: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    className?: string;
}) => {
    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={`cursor-pointer bg-[#e2b714] text-[#323437] rounded-xl px-8 py-2 text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default React.memo(Button);
