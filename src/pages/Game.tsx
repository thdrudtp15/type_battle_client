// 게임

import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';

import Waiting from '../components/game/Waiting';
import Match from '../components/game/Match';
import Result from '../components/game/Result';
import ConnectingError from '../components/game/ConnectingError';
import Connecting from '../components/game/Connecting';
import Index from '../components/game/Index';

const Game = () => {
    const { socket, status } = useSocket();

    //==============
    // 소켓 상태 확인용
    //==============
    useEffect(() => {
        console.log(status);
    }, [status]);

    if (!socket) return null;

    if (status === 'connected') return <Index socket={socket} />;
    else if (status === 'connecting') return <Connecting />;
    else if (status === 'waiting') return <Waiting socket={socket} />;
    else if (status === 'matched') return <Match />;
    else if (status === 'result') return <Result />;
    else if (status === 'error') return <ConnectingError />;

    // 소켓 상태 별 랜더링
};
export default Game;
