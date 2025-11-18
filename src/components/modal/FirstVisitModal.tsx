import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const FirstVisitModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isFirstVisit = sessionStorage.getItem('isFirstVisit');

    useEffect(() => {
        if (!isFirstVisit) {
            setIsOpen(true);
        }
    }, [isFirstVisit]);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('isFirstVisit', 'true');
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="WELCOME">
            <div className="flex flex-col gap-6 py-4">
                {/* 환영 아이콘 */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="flex justify-center"
                >
                    <div className="w-24 h-24 rounded-full bg-gray-900/50 flex items-center justify-center border-4 border-[#e2b714]">
                        <span className="text-5xl">👋</span>
                    </div>
                </motion.div>

                {/* 프로젝트 소개 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-2"
                >
                    <h2 className="text-xl font-bold text-[#e2b714]">프로젝트 소개</h2>
                    <p className="text-base text-[#d1d0c5]">
                        WebSocket 서버 통신을 기반으로 한 실시간 타이핑 대결 프로젝트입니다.
                    </p>
                </motion.div>

                {/* 테스트 방법 안내 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                >
                    <div className="bg-modal-dark rounded-xl p-4 border-2 border-gray-700 ">
                        <p className="text-sm font-semibold text-[#d1d0c5] mb-3 text-center">
                            정식 서비스는 아니기 때문에 테스트는 아래 방식으로 진행을 부탁드립니다.
                        </p>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🖥️</span>
                            <div>
                                <p className="text-sm font-semibold text-[#d1d0c5] mb-1">브라우저 탭을 2개 열기</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">⚔️</span>
                            <div>
                                <p className="text-sm font-semibold text-[#d1d0c5] mb-1">
                                    매칭을 시작하면 자동으로 서로 매칭됨
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 시작 버튼 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full mt-2"
                >
                    <Button onClick={handleClose} disabled={false}>
                        시작하기
                    </Button>
                </motion.div>
            </div>
        </Modal>
    );
};

export default FirstVisitModal;
