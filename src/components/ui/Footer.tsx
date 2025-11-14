// 글씨채 변경하기
// 콘텍트 누르면 모달 띄우기
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from '../modal/ContactModal';

const Footer = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>
            <footer className="flex items-center gap-4 py-6 text-md  text-bold">
                <button
                    className="hover:text-[#e2b714] cursor-pointer transition-all duration-200 text-lg font-bold tracking-wider opacity-80 hover:opacity-100"
                    onClick={() => setIsContactModalOpen(true)}
                >
                    CONTACT
                </button>
                <Link
                    to="/"
                    className="hover:text-[#e2b714] cursor-pointer transition-all duration-200 text-lg font-bold tracking-wider opacity-80 hover:opacity-100"
                >
                    GITHUB
                </Link>
            </footer>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </>
    );
};

export default Footer;
