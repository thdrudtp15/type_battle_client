import React from 'react';
import Modal from '../ui/Modal';

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ContactModal = React.memo(({ isOpen, onClose }: ContactModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="CONTACT">
            <div>
                <h2>Contact</h2>
            </div>
        </Modal>
    );
});

export default ContactModal;
