import { motion } from 'framer-motion';
const LiveDemo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-modal-dark rounded-xl w-40 h-120 w-full hidden md:block"
        >
            {/* <img src="/images/live-demo.gif" alt="live-demo" className="w-full h-full object-cover" /> */}
        </motion.div>
    );
};

export default LiveDemo;
