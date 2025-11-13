// 게임
import { useEffect } from 'react';
import useSocket from '../hooks/useSocket';

import Index from '../components/Index';
import LiveDemo from '../components/ui/LiveDemo';
import Match from '../components/Match';
import Modal from '../components/ui/Modal';
import ResultModal from '../components/modal/ResultModal';

const Game = () => {
    const {
        socket,
        status,
        alarm,
        roomId,
        setStatus,
        setAlarm,
        matchCountdown,
        matchRemainingTime,
        matchLog,
        matchResult,
    } = useSocket();

    //==============
    // 소켓 상태 확인용
    //==============

    useEffect(() => {}, [status]);

    console.log(matchLog?.player.sentence);

    const indexStatus = status === 'finding_match' || status === 'connected' || status === 'disconnected' || !status;
    const matchStatus = status === 'match_start' || status === 'match_result' || status === 'found_match';

    if (indexStatus) {
        return (
            <div className="flex gap-4 w-full">
                <Index socket={socket} status={status}>
                    <Modal isOpen={alarm === 'opponent_disconnected'} onClose={() => setAlarm(null)}>
                        상대방이 게임을 취소했어요.
                    </Modal>
                </Index>
                <LiveDemo />
            </div>
        );
    } else if (matchStatus && socket) {
        return (
            <Match matchRemainingTime={matchRemainingTime} socket={socket} roomId={roomId} matchLog={matchLog}>
                <ResultModal
                    isOpen={status === 'match_result' && !!matchResult}
                    onClose={() => setStatus('connected')}
                    matchResult={matchResult || { player: null, opponent: null }}
                />
                <Modal isOpen={status === 'found_match'}>
                    매치를 찾았어요!
                    {matchCountdown}초 뒤에 게임이 시작됩니다!
                </Modal>
            </Match>
        );
    }
};
export default Game;
