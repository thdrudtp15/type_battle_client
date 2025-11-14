import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import type { Socket } from 'socket.io-client';

type IndexProps = {
    socket: Socket | null;
    status: string;
    children: React.ReactNode;
};

const Index = ({ socket, status, children }: IndexProps) => {
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
        socket?.emit('cancel_find_match');
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
                            isServerEnabled ? 'border-green-500/30 bg-green-500/10' : 'border-red-500/30 bg-red-500/10'
                        }`}
                    >
                        <motion.span
                            className={`w-2 h-2 rounded-full ${isServerEnabled ? 'bg-green-500' : 'bg-red-500'}`}
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
                        <span className={`text-sm  ${isServerEnabled ? 'text-green-400' : 'text-red-400'}`}>
                            서버상태 : {isServerEnabled ? '정상' : '비활성'}
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
                    <div className="flex gap-4">
                        <Button onClick={status === 'connected' ? findMatch : cancelMatch} disabled={!status}>
                            {status === 'connected' && '매칭하기'}
                            {status === 'finding_match' && '매칭 중...'}
                            {status === 'disconnected' && '서버 연결 중...'}
                        </Button>
                    </div>
                </motion.div>
                {/** 모달  */}
                {children}
            </>
        </AnimatePresence>
    );
};

export default Index;
