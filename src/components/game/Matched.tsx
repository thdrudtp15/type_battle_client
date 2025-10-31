import { useState } from 'react';
import Modal from '../ui/Modal';

import type { Socket } from 'socket.io-client';
import type { SocketStatus } from '../../types/socketStatus';

type MatchedProps = {
    socket: Socket;
    roomId: string | null;
    opponentReady: boolean;
    alarm: string | null;
    setStatus: (status: SocketStatus) => void;
    readyCountdown: number;
};

const Matched = ({ socket, roomId, opponentReady, alarm, setStatus, readyCountdown }: MatchedProps) => {
    const [isReady, setIsReady] = useState(false);

    // const navigate = useNavigate();

    const handleReady = () => {
        if (!roomId) return;
        socket?.emit('player_ready', roomId);
        setIsReady(true);
    };

    const handleCancelReady = () => {
        if (!roomId) return;
        socket?.emit('player_cancel_ready', roomId);
        setIsReady(false);
    };

    const handleMatchClose = () => {
        setStatus('connected');
    };

    // 일정 시간 이후에도 준비 완료 버튼 누르지 않을 경우
    // 매치가 취소됨

    return (
        <div>
            <h1>Matched</h1>
            {!isReady && <button onClick={handleReady}>준비하기</button>}
            {isReady && <button onClick={handleCancelReady}>준비취소</button>}
            {opponentReady && <p>상대방 준비 완료</p>}
            {readyCountdown > 0 && <p>남은 시간: {readyCountdown}초</p>}
            {alarm === 'opponent_disconnected' && !roomId && (
                <Modal onClose={handleMatchClose}>상대방이 매치를 취소했어요</Modal>
            )}
            {alarm === 'timeout' && <Modal onClose={handleMatchClose}>준비 시간 초과로 매칭이 취소되었어요</Modal>}
        </div>
    );
};

export default Matched;
