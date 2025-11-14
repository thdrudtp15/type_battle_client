import Modal from '../ui/Modal';

import React from 'react';
import type { Players } from '../../types/players';

type ResultModalProps = {
    isOpen: boolean;
    onClose: () => void;
    matchResult: {
        player: Players | null;
        opponent: Players | null;
    };
};

const ResultModal = React.memo(({ isOpen, onClose, matchResult }: ResultModalProps) => {
    const { player, opponent } = matchResult;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="RESULT">
            <div className="flex gap-4">
                <div>
                    <p>내 점수</p>
                    <p>{player?.point || 0}</p>
                </div>
                <div>
                    <p>상대방 점수</p>
                    <p>{opponent?.point || 0}</p>
                </div>
            </div>
        </Modal>
    );
});
export default ResultModal;
