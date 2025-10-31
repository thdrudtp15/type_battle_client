import { useEffect } from 'react';

import Modal from '../ui/Modal';

import type { Socket } from 'socket.io-client';
import type { SocketStatus } from '../../types/socketStatus';

type MatchNProps = {
    socket: Socket;
    roomId: string | null;
    gameCountdown: number;
    isGameStarted: boolean;
    alarm: string | null;
    setStatus: (status: SocketStatus) => void;
};
const MatchN = ({ socket, roomId, gameCountdown, isGameStarted, alarm, setStatus }: MatchNProps) => {
    useEffect(() => {}, [isGameStarted]);

    const handleMatchEnd = () => {
        if (!roomId) return;
        socket.emit('typing_end', roomId);
    };

    return (
        <div>
            {gameCountdown > 0 && <p>시작까지 남은 시간 : {gameCountdown}초</p>}
            {alarm === 'opponent_disconnected' && (
                <Modal onClose={() => setStatus('connected')}>상대방이 게임을 취소했습니다.</Modal>
            )}
            {!isGameStarted && <p>게임을 준비해주세요</p>}
            {isGameStarted && <p>게임이 시작 되었습니다.</p>}
            <button onClick={handleMatchEnd}>타이핑 마치기</button>
        </div>
    );
};

export default MatchN;
