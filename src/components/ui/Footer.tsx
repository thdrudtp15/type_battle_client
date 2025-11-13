// 글씨채 변경하기
// 콘텍트 누르면 모달 띄우기
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';

const Footer = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>
            <footer className="flex items-center gap-4 py-6 text-md  text-bold">
                <button
                    className="hover:text-white cursor-pointer transition duration-300 text-sm font-mono"
                    onClick={() => setIsContactModalOpen(true)}
                >
                    contact
                </button>
                <Link to="/" className="hover:text-white cursor-pointer transition duration-300 text-sm font-mono">
                    github
                </Link>
            </footer>
            <Modal onClose={() => setIsContactModalOpen(false)} isOpen={isContactModalOpen}>
                <div>
                    <h2>Contact</h2>
                </div>
            </Modal>
        </>
    );
};

export default Footer;
