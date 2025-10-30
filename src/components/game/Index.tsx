import type { Socket } from 'socket.io-client';

type IndexProps = {
    socket: Socket;
};
const Index = ({ socket }: IndexProps) => {
    const findMatch = () => {
        socket?.emit('matching');
    };

    return (
        <div>
            <button onClick={findMatch}>매칭하기</button>
        </div>
    );
};

export default Index;
