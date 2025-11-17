// 글씨채 변경하기
// 콘텍트 누르면 모달 띄우기
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactModal from '../modal/ContactModal';

const Footer = () => {
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    return (
        <>
            <footer className="flex items-center gap-6 py-6">
                {/* <button
                    className="text-[#646669] hover:text-[#e2b714] cursor-pointer transition-all duration-300 text-xl font-semibold tracking-widest uppercase relative group"
                    onClick={() => setIsContactModalOpen(true)}
                >
                    <span className="relative z-10">CONTACT</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e2b714] group-hover:w-full transition-all duration-300" />
                </button> */}
                <Link
                    to="https://github.com/thdrudtp15/typing_battle"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-[#646669] hover:text-[#e2b714] cursor-pointer transition-all duration-300 text-xl font-semibold tracking-widest uppercase relative group"
                >
                    <span className="relative z-10">GITHUB</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e2b714] group-hover:w-full transition-all duration-300" />
                </Link>
            </footer>
            <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
        </>
    );
};

export default Footer;
