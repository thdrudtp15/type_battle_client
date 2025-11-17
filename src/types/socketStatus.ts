export type SocketStatus =
    | 'disconnected' // 연결 해제
    | 'connected' // 연결 성공
    | 'finding_match' // 매칭 요청
    | 'match_start' // 게임 시작
    | 'match_result' // 게임 결과
    | 'found_match' // 매칭 찾기 성공 시.
    | 'connecting' // 연결 시도 중
    | 'reconnecting'; // 재연결 시도 중
