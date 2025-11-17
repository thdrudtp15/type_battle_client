// import { motion } from 'framer-motion';
// import { BiSolidVolumeMute } from 'react-icons/bi';
// import { BiSolidVolumeFull } from 'react-icons/bi';
// import { useState } from 'react';

const Header = () => {
    // const [isMuted, setIsMuted] = useState(false);

    // const toggleMute = () => {
    //     setIsMuted(!isMuted);
    // };

    // 음량
    // 로컬 스토리지로 관리.

    return (
        <header className="flex items-center justify-between py-6">
            <p className="text-2xl font-bold text-yellow-500">TYPE BATTLE</p>
            {/* <button onClick={toggleMute} className="cursor-pointer">
                {isMuted ? (
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <BiSolidVolumeMute className="w-6 h-6" />
                    </motion.div>
                ) : (
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <BiSolidVolumeFull className="w-6 h-6 text-yellow-500" />
                    </motion.div>
                )}
            </button> */}
        </header>
    );
};

export default Header;
