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
                        className="text-7xl font-bold mb-6 text-[#e2b714]"
                    >
                        타이핑 배틀
                    </motion.h1>

                    {/* Description Section */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-10 space-y-6"
                    >
                        <div className="space-y-3">
                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-2xl text-[#d1d0c5] font-medium leading-relaxed"
                            >
                                실시간으로 상대방과 타이핑 실력을 겨루는 타이핑 배틀 게임입니다.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-base text-[#646669] leading-relaxed max-w-2xl"
                            >
                                빠른 타이핑 속도와 높은 정확도로 승리하세요!
                            </motion.p>
                        </div>

                        {/* Divider */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                            className="h-px bg-gradient-to-r from-transparent via-[#646669]/30 to-transparent"
                        />

                        {/* Feature Grid */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                        >
                            {[
                                {
                                    title: '실시간 경쟁',
                                    desc: '상대방과 동시에 타이핑하며 실시간으로 점수를 비교합니다',
                                    delay: 0.85,
                                },
                                {
                                    title: '정확한 통계',
                                    desc: '정확도, 점수, 진행도를 실시간으로 확인할 수 있습니다',
                                    delay: 0.9,
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: item.delay }}
                                    className="relative"
                                >
                                    <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-[#e2b714]/50" />
                                    <div className="pl-4 py-2">
                                        <h4 className="text-lg text-[#e2b714] font-semibold mb-1">{item.title}</h4>
                                        <p className="text-sm text-[#646669]">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

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
