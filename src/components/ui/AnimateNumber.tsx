import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimateNumber = ({ value, className }: { value: number; className?: string }) => {
    return (
        <div style={{ overflow: 'hidden' }}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={value}
                    initial={{ y: 20, opacity: 0, rotateX: 90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -20, opacity: 0, rotateX: -90 }}
                    transition={{ duration: 0.3 }}
                    className={className}
                >
                    {value}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
export default React.memo(AnimateNumber);
