import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import React from 'react';

type FoundMatchModalProps = {
    isOpen: boolean;
    matchCountdown: number;
};

const FoundMatchModal = React.memo(({ isOpen, matchCountdown }: FoundMatchModalProps) => {
    return (
        <Modal isOpen={isOpen} title="매치 찾기">
            <div className="flex flex-col items-center gap-6 py-4">
                {/* 아이콘 영역 */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-modal-dark flex items-center justify-center border-2 border-[#e2b714]"
                >
                    <span className="text-4xl">🎮</span>
                </motion.div>

                {/* 메시지 영역 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-3"
                >
                    <p className="text-xl font-semibold text-green-500">매칭 성공!</p>
                    <p className="text-base text-[#646669]">상대방을 찾았습니다.</p>
                </motion.div>

                {/* 카운트다운 영역 */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="w-full"
                >
                    <div className="bg-modal-dark rounded-xl p-6 border-2 border-gray-700">
                        <p className="text-center text-sm text-[#646669] mb-2">게임 시작까지</p>
                        <motion.div
                            key={matchCountdown}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <span className="text-5xl font-bold text-[#e2b714]">{matchCountdown || 3}</span>
                            <span className="text-2xl text-[#646669] ml-2">초</span>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </Modal>
    );
});

export default FoundMatchModal;
