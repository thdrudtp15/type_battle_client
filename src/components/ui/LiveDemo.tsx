import { motion } from 'framer-motion';
const LiveDemo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-yellow-500 w-40 h-40 w-full hidden md:block"
        >
            게임 영상 GIF 또는 만들기..!ㅋ
        </motion.div>
    );
};

export default LiveDemo;
