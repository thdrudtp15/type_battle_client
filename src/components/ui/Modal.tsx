import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

type ModalProps = {
    children: React.ReactNode;
    onClose?: () => void;
    isOpen: boolean;
    title?: string;
};

const Modal = ({ children, onClose, isOpen, title }: ModalProps) => {
    //==============
    // 배경 클릭 이벤트 핸들러
    //==============
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
                    transition={{ duration: 0.15 }}
                    className="fixed inset-0 z-50  bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
                    onClick={clickBackground}
                >
                    {/** 모달 콘텐츠 */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="bg-[#151a23] border-2 border-yellow-500 text-[#d1d0c5] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
                    >
                        {/* 헤더 */}
                        <div className="px-6 py-4 border-b border-dotted border-b-3 border-[#3a3d42] flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-[#e2b714]">{title || '타이틀 입력하기'}</h2>
                            {onClose && (
                                <button
                                    onClick={onClose}
                                    className="text-[#646669] font-mono text-bold cursor-pointer hover:text-[#d1d0c5] transition-colors duration-200 text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#3a3d42]"
                                    aria-label="닫기"
                                >
                                    X
                                </button>
                            )}
                        </div>

                        {/* 콘텐츠 */}
                        <div className="px-6 py-4">{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default React.memo(Modal);
