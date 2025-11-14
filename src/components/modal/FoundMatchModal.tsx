import Modal from '../ui/Modal';
import React from 'react';

type FoundMatchModalProps = {
    isOpen: boolean;
    matchCountdown: number;
};

const FoundMatchModal = React.memo(({ isOpen, matchCountdown }: FoundMatchModalProps) => {
    return (
        <Modal isOpen={isOpen} title="매치 찾기">
            <div className="text-center">
                <p className="text-lg text-[#d1d0c5]">매치가 찾아졌어요.</p>
                <p className="text-lg text-[#d1d0c5]">게임이 {matchCountdown}초 후에 시작됩니다.</p>
            </div>
        </Modal>
    );
});

export default FoundMatchModal;
