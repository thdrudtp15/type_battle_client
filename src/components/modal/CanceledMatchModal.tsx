import React from 'react';
import Modal from '../ui/Modal';

type CanceledMatchModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CanceledMatchModal = React.memo(({ isOpen, onClose }: CanceledMatchModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="매치 취소">
            <div className="text-center">
                <p className="text-lg text-[#d1d0c5]">상대방이 게임을 취소했어요.</p>
            </div>
        </Modal>
    );
});

export default CanceledMatchModal;
