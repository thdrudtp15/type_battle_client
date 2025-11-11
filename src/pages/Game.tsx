// 게임

import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';

import Waiting from '../components/game/Waiting';
// import Match from '../components/game/Match';
import Result from '../components/game/Result';
import ConnectingError from '../components/game/ConnectingError';
import Connecting from '../components/game/Connecting';
import Index from '../components/game/Index';
import Matched from '../components/game/Matched';

import Match from '../components/game/Match';

const Game = () => {
    const {
        socket,
        status,
        roomId,
        opponentReady,
        alarm,
        setStatus,
        setAlarm,
        readyCountdown,
        gameCountdown,
        gameStartTime,
        elapsedTime,
        opponentInput,
        opponentLog,
        result,
        isTypingEnd,
        sentence,
    } = useSocket();

    //==============
    // 소켓 상태 확인용
    //==============
    useEffect(() => {
        console.log(status);
        setAlarm(null);
    }, [status]);

    if (!socket) return <div>소켓 서버 에러</div>;

    if (status === 'connected') return <Index socket={socket} />;
    else if (status === 'connecting') return <Connecting />;
    else if (status === 'waiting') return <Waiting socket={socket} />;
    else if (status === 'matched')
        return (
            <Matched
                socket={socket}
                roomId={roomId}
                opponentReady={opponentReady}
                alarm={alarm}
                setStatus={setStatus}
                readyCountdown={readyCountdown}
            />
        );
    else if (status === 'playing')
        return (
            <Match
                gameCountdown={gameCountdown}
                setStatus={setStatus}
                roomId={roomId}
                socket={socket}
                alarm={alarm}
                gameStartTime={gameStartTime}
                elapsedTime={elapsedTime}
                opponentInput={opponentInput}
                opponentLog={opponentLog}
                isTypingEnd={isTypingEnd}
                sentence={sentence}
            />
        );
    else if (status === 'result') return <Result result={result} />;
    else if (status === 'error') return <ConnectingError />;

    return <div>아무 내용도 없음.</div>;
    // 소켓 상태 별 랜더링
};
export default Game;
