// 게임
import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';

// import Waiting from '../components/game/Waiting';
// import Match from '../components/game/Match';
// import Result from '../components/game/Result';
// import ConnectingError from '../components/game/ConnectingError';
// import Connecting from '../components/game/Connecting';
import Index from '../components/game/Index';
// import Matched from '../components/game/Matched';
// import Match from '../components/game/Match';
import LiveDemo from '../components/ui/LiveDemo';

import Match from '../components/Match';

const Game = () => {
    const {
        socket,
        status,
        alarm,
        roomId,
        // opponentReady,
        setStatus,
        setAlarm,
        // readyCountdown,
        // gameCountdown,
        // gameStartTime,
        // elapsedTime,
        // opponentInput,
        // opponentLog,
        // result,
        // isTypingEnd,
        sentence,
        matchCountdown,
        matchRemainingTime,
    } = useSocket();

    //==============
    // 소켓 상태 확인용
    //==============

    useEffect(() => {}, [status]);

    const indexStatus =
        status === 'found_match' ||
        status === 'finding_match' ||
        status === 'connected' ||
        status === 'disconnected' ||
        !status;
    const matchStatus = status === 'match_start' || status === 'match_result';

    // if (socket) {
    //     return (
    //         <Match
    //             matchRemainingTime={{ matchPlayTime: 60, remainingTime: 50 }}
    //             sentence={['안녕하세요', '반갑습니다']}
    //             socket={socket}
    //             roomId={roomId}
    //             setStatus={setStatus}
    //             status={status}
    //         />
    //     );
    // }

    if (indexStatus) {
        return (
            <div className="flex gap-4 w-full">
                <Index
                    socket={socket}
                    status={status}
                    setAlarm={setAlarm}
                    matchCountdown={matchCountdown}
                    alarm={alarm}
                />
                <LiveDemo />
            </div>
        );
    } else if (matchStatus && socket) {
        return (
            <Match
                matchRemainingTime={matchRemainingTime}
                sentence={sentence}
                socket={socket}
                roomId={roomId}
                setStatus={setStatus}
                status={status}
            />
        );
    }

    // if (!socket) return <div>소켓 서버 에러</div>;

    // if (status === 'connected') return <Index socket={socket} />;
    // else if (status === 'connecting') return <Connecting />;
    // else if (status === 'waiting') return <Waiting socket={socket} />;
    // else if (status === 'matched')
    //     return (
    //         <Matched
    //             socket={socket}
    //             roomId={roomId}
    //             opponentReady={opponentReady}
    //             alarm={alarm}
    //             setStatus={setStatus}
    //             readyCountdown={readyCountdown}
    //         />
    //     );
    // else if (status === 'playing')
    //     return (
    //         <Match
    //             gameCountdown={gameCountdown}
    //             setStatus={setStatus}
    //             roomId={roomId}
    //             socket={socket}
    //             alarm={alarm}
    //             gameStartTime={gameStartTime}
    //             elapsedTime={elapsedTime}
    //             opponentInput={opponentInput}
    //             opponentLog={opponentLog}
    //             isTypingEnd={isTypingEnd}
    //             sentence={sentence}
    //         />
    //     );
    // else if (status === 'result') return <Result result={result} />;
    // else if (status === 'error') return <ConnectingError />;

    // return <div>아무 내용도 없음.</div>;
    // 소켓 상태 별 랜더링
};
export default Game;
