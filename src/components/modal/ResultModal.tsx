import { motion } from 'framer-motion';
import Modal from '../ui/Modal';
import React from 'react';
import type { Players } from '../../types/players';
import Button from '../ui/Button';
import { getTime } from '../../lib/util/getTime';

import { getCompareIcon, getCompareResult } from '../../lib/util/getCompare';

type ResultModalProps = {
    isOpen: boolean;
    onClose: () => void;
    matchResult: {
        player: Players | null;
        opponent: Players | null;
    };
};

type ScoreProps = {
    target: 'player' | 'opponent';
    player: Players | null;
    playerTime: number;
    scoreCompare: 'over' | 'under' | 'equal';
    accuracyCompare: 'over' | 'under' | 'equal';
    elapsedTimeCompare: 'over' | 'under' | 'equal';
    matchWinner: 'player' | 'opponent' | 'draw';
};

const Score = ({
    target,
    player,
    playerTime,
    scoreCompare,
    accuracyCompare,
    elapsedTimeCompare,
    matchWinner,
}: ScoreProps) => {
    const win = matchWinner === target;

    return (
        <div
            className={`rounded-xl p-4 border-2 ${
                win ? 'bg-gray-900/50 border-yellow-500' : 'bg-gray-900/50 border-gray-700'
            }`}
        >
            <p className="text-sm text-[#646669] mb-2 text-center">{target === 'player' ? '나' : '상대'}</p>
            <div className="text-center space-y-1">
                <div>
                    <p className="text-xs text-[#646669] flex items-center gap-1 justify-center">
                        점수
                        {getCompareIcon(scoreCompare)}
                    </p>
                    <p className={`text-3xl font-bold ${win ? 'text-yellow-500' : 'text-[#d1d0c5]'}`}>
                        {player?.point || 0}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-[#646669] flex items-center gap-1 justify-center">
                        정확도
                        {getCompareIcon(accuracyCompare)}
                    </p>
                    <p className="text-lg text-[#d1d0c5]">
                        {player?.accuracy ? `${player.accuracy.toFixed(1)}%` : '0%'}
                    </p>
                </div>
                {playerTime && (
                    <div>
                        <p className="text-xs text-[#646669] flex items-center gap-1 justify-center">
                            경과 시간
                            {getCompareIcon(elapsedTimeCompare)}
                        </p>
                        <p className="text-lg text-[#d1d0c5]">
                            {getTime(playerTime).minutes > 0
                                ? `${getTime(playerTime).minutes}분 ${getTime(playerTime).seconds}초`
                                : `${getTime(playerTime).seconds}초`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ResultModal = React.memo(({ isOpen, onClose, matchResult }: ResultModalProps) => {
    const { player, opponent } = matchResult;

    // 승자 판정: 점수가 높은 쪽이 승자, 점수가 같으면 시간이 빠른 쪽이 승자
    const getWinner = () => {
        if (!player || !opponent) return null;

        const playerPoint = player.point || 0;
        const opponentPoint = opponent.point || 0;

        if (playerPoint > opponentPoint) return 'player';
        if (opponentPoint > playerPoint) return 'opponent';

        if (player.finished && opponent.finished) {
            if (player.finished === opponent.finished) return 'draw';
            return player.finished < opponent.finished ? 'player' : 'opponent';
        }

        // finished가 없으면 무승부
        return 'draw';
    };

    const matchWinner = getWinner();

    // 시간 계산 (finished가 있으면 사용, 없으면 null)

    const playerTime = player?.finished || 0;
    const opponentTime = opponent?.finished || 0;

    if (!player || !opponent) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="RESULT">
            <div className="flex flex-col gap-6 py-4">
                {/* 결과 아이콘 */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    className="flex justify-center"
                >
                    {matchWinner === 'player' && (
                        <div className="w-24 h-24 rounded-full bg-modal-dark flex items-center justify-center border-4 border-[#e2b714]">
                            <span className="text-5xl">🏆</span>
                        </div>
                    )}
                    {matchWinner === 'opponent' && (
                        <div className="w-24 h-24 rounded-full bg-modal-dark flex items-center justify-center border-4 border-[#646669]">
                            <span className="text-5xl">😢</span>
                        </div>
                    )}
                    {matchWinner === 'draw' && (
                        <div className="w-24 h-24 rounded-full bg-modal-dark flex items-center justify-center border-4 border-[#646669]">
                            <span className="text-5xl">🤝</span>
                        </div>
                    )}
                </motion.div>

                {/* 결과 메시지 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    {matchWinner === 'player' && <p className="text-2xl font-bold text-green-500">승리!</p>}
                    {matchWinner === 'opponent' && <p className="text-2xl font-bold text-red-500">패배</p>}
                    {matchWinner === 'draw' && <p className="text-2xl font-bold text-[#646669]">무승부</p>}
                </motion.div>

                {/* 점수 비교 영역 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-2 gap-4"
                >
                    {/* 내 점수 */}

                    <Score
                        target={'player'}
                        player={player}
                        playerTime={playerTime}
                        matchWinner={matchWinner!}
                        scoreCompare={getCompareResult(player.point, opponent.point)}
                        accuracyCompare={getCompareResult(player.accuracy, opponent.accuracy)}
                        elapsedTimeCompare={getCompareResult(-playerTime, -opponentTime)}
                    />
                    <Score
                        target={'opponent'}
                        player={opponent}
                        playerTime={opponentTime}
                        matchWinner={matchWinner!}
                        scoreCompare={getCompareResult(opponent.point, player.point)}
                        accuracyCompare={getCompareResult(opponent.accuracy, player.accuracy)}
                        elapsedTimeCompare={getCompareResult(-opponentTime, -playerTime)}
                    />
                </motion.div>

                {/* 확인 버튼 */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-full mt-2"
                >
                    <Button onClick={onClose} disabled={false}>
                        확인
                    </Button>
                </motion.div>
            </div>
        </Modal>
    );
});
export default ResultModal;
