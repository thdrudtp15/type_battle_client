import { motion } from 'framer-motion';
import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

type CanceledMatchModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CanceledMatchModal = React.memo(({ isOpen, onClose }: CanceledMatchModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="CANCELED">
            <div className="flex flex-col items-center gap-6 py-4">
                {/* 아이콘 영역 */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-modal-dark flex items-center justify-center border-2 border-gray-700"
                >
                    <span className="text-4xl">⚠️</span>
                </motion.div>

                {/* 메시지 영역 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-2"
                >
                    <p className="text-xl font-semibold text-[#d1d0c5]">매치가 취소되었습니다</p>
                    <p className="text-base text-[#646669]">상대방이 게임을 취소했어요.</p>
                </motion.div>

                {/* 확인 버튼 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full mt-2"
                >
                    <Button onClick={onClose} disabled={false}>
                        확인
                    </Button>
                </motion.div>
            </div>
        </Modal>
    );
});

export default CanceledMatchModal;
