import type { Socket } from 'socket.io-client';

// 로딩 중과 같음.
type WaitingProps = {
    socket: Socket;
};
const Waiting = ({ socket }: WaitingProps) => {
    const cancelMatch = () => {
        socket?.emit('matching_cancel');
    };
    return (
        <div>
            <button onClick={cancelMatch}>매칭 취소</button>

            {/**경과 시간 표시 하는 것도 괜찮을 듯 */}
        </div>
    );
};
export default Waiting;
