// 게임
import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';

import Index from '../components/Index';
import LiveDemo from '../components/ui/LiveDemo';
import Match from '../components/Match';
import ResultModal from '../components/modal/ResultModal';
import CanceledMatchModal from '../components/modal/CanceledMatchModal';
import FoundMatchModal from '../components/modal/FoundMatchModal';

const Game = () => {
    const {
        socket,
        status,
        alarm,
        roomId,
        setStatus,
        setAlarm,
        matchStartTime,
        matchCountdown,
        matchRemainingTime,
        matchLog,
        matchResult,
        resetGame,
        opponentCpm,
    } = useSocket();

    //==============
    // 소켓 상태 확인용
    //==============

    useEffect(() => {
        if (status === 'connected') resetGame();
    }, [status]);

    const indexStatus = status === 'finding_match' || status === 'connected' || status === 'disconnected' || !status;
    const matchStatus = status === 'match_start' || status === 'match_result' || status === 'found_match';

    if (indexStatus) {
        return (
            <div className="flex gap-4 w-full">
                <Index socket={socket} status={status}>
                    <CanceledMatchModal isOpen={alarm === 'opponent_disconnected'} onClose={() => setAlarm(null)} />
                </Index>
                <LiveDemo />
            </div>
        );
    } else if (matchStatus && socket) {
        return (
            <Match
                matchRemainingTime={matchRemainingTime}
                socket={socket}
                roomId={roomId}
                matchLog={matchLog}
                status={status}
                matchStartTime={matchStartTime}
                opponentCpm={opponentCpm}
            >
                <ResultModal
                    isOpen={status === 'match_result' && !!matchResult}
                    onClose={() => setStatus('connected')}
                    matchResult={matchResult || { player: null, opponent: null }}
                />
                <FoundMatchModal isOpen={status === 'found_match'} matchCountdown={matchCountdown} />
            </Match>
        );
    }
};
export default Game;
