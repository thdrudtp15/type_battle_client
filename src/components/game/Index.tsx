import { motion, AnimatePresence } from 'framer-motion';

import Modal from '../ui/Modal';

import type { Socket } from 'socket.io-client';

type IndexProps = {
    socket: Socket | null;
    status: string;
    matchCountdown: number;
    alarm: string | null;
    setAlarm: (alarm: string | null) => void;
};

const Index = ({ socket, status, matchCountdown, alarm, setAlarm }: IndexProps) => {
    //==============
    // 매칭 요청
    //==============
    const findMatch = () => {
        if (!status) return;
        socket?.emit('find_match');
    };

    //==============
    // 매칭 취소
    //==============
    const cancelMatch = () => {
        if (!status) return;
        socket?.emit('matching_cancel');
    };

    const isServerEnabled = status !== 'disconnected' || !status;

    return (
        <AnimatePresence mode="wait">
            <>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl"
                >
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl mb-8 border ${
                            isServerEnabled ? 'border-green-500/30 bg-green-500/10' : 'border-[#646669] bg-[#2c2e31]'
                        }`}
                    >
                        <motion.span
                            className={`w-2 h-2 rounded-full ${isServerEnabled ? 'bg-green-500' : 'bg-[#646669]'}`}
                            animate={
                                isServerEnabled
                                    ? {
                                          scale: [1, 1.2, 1],
                                          opacity: [1, 0.5, 1],
                                      }
                                    : {}
                            }
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <span className={`text-sm  ${isServerEnabled ? 'text-green-400' : 'text-[#646669]'}`}>
                            서버상태 : {isServerEnabled ? '정상' : '비활성화 됨'}
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-7xl font-bold mb-8 text-[#e2b714] "
                    >
                        타이핑 배틀
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-[#646669] mb-8  leading-relaxed"
                    >
                        WebSocket 기반 실시간 통신으로 구현한 타이핑 배틀 게임입니다.
                    </motion.p>

                    {/* Feature List */}
                    <motion.ul
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col gap-3 mb-10"
                    >
                        {[
                            { text: 'socket.io를 이용한 실시간 통신', delay: 0.6 },
                            { text: 'framer motion을 이용한 애니메이션', delay: 0.7 },
                        ].map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: item.delay }}
                                className="text-lg text-[#d1d0c5]  flex items-center gap-3"
                            >
                                <span className="text-[#e2b714]">▸</span>
                                {item.text}
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Buttons */}
                    <div className="flex gap-4 flex-wrap">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{
                                scale: 1.02,
                                backgroundColor: '#f0c929',
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={status === 'connected' ? findMatch : cancelMatch}
                            disabled={!status}
                            className="cursor-pointer bg-[#e2b714] text-[#323437] rounded-xl px-8 py-2 text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {status === 'connected' && '매칭하기'}
                            {status === 'finding_match' && '매칭 중...'}
                            {status === 'disconnected' && '서버 연결 중...'}
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: '#3f3f46',
                                borderColor: '#e2b714',
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="cursor-pointer bg-[#2c2e31] text-[#d1d0c5] border-2 border-[#646669] rounded-xl px-8 py-2 text-2xl font-bold transition-colors"
                        >
                            연습하기
                        </motion.button>
                    </div>
                </motion.div>
                {/** 모달  */}
                <Modal isOpen={status === 'found_match'}>
                    매치를 찾았어요!
                    {matchCountdown}초 뒤에 게임이 시작됩니다!
                </Modal>
                <Modal isOpen={alarm === 'opponent_disconnected'} onClose={() => setAlarm(null)}>
                    상대방이 게임을 취소했어요.
                </Modal>
            </>
        </AnimatePresence>
    );
};

export default Index;
