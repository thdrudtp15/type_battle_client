import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const Modal = React.memo(
    ({ children, onClose, isOpen }: { children: React.ReactNode; onClose?: () => void; isOpen: boolean }) => {
        const clickBackground = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget && onClose) {
                onClose();
            }
        };

        return (
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute h-screen w-screen top-0 left-0 bg-black/50 flex justify-center items-center"
                        onClick={clickBackground}
                    >
                        {/** 모달 콘텐츠 */}
                        <div className="bg-gray-800 text-white p-4 rounded-lg border border-gray-700 border-[4px] w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact</h2>
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        );
    }
);

export default Modal;
