import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Introduction = () => {
    const navigate = useNavigate();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>서버 상태</div>
                <p>실시간 타이핑 배틀</p>
                <p>
                    WebSocket 기반의 실시간 통신 구조를 설계하고 Socket.io로 구현한 타이핑 배틀 게임입니다. 실시간 입력
                    동기화와 CSS 애니메이션을 결합해 반응성 높은 사용자 경험을 완성했습니다.
                </p>
                <ul>
                    <li>WebSocket 기반의 실시간 통신 구조를 설계하고 Socket.io로 구현한 타이핑 배틀 게임입니다.</li>
                    <li>실시간 입력 동기화와 CSS 애니메이션을 결합해 반응성 높은 사용자 경험을 완성했습니다.</li>
                </ul>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/game')}
                >
                    Start Game
                </motion.button>
            </motion.div>
        </AnimatePresence>
    );
};

export default Introduction;
