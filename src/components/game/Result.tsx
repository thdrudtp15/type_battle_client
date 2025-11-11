// 매치 결과
import { getTime } from '../../lib/util/getTime';

type ResultProps = {
    result: {
        myResult: { failedCount: number; elapsedTime: number; penaltyTime: number; totalTime: number };
        opponentResult: { failedCount: number; elapsedTime: number; penaltyTime: number; totalTime: number };
    } | null;
};

const Result = ({ result }: ResultProps) => {
    if (!result) return <div>결과가 없습니다.</div>;
    const { myResult, opponentResult } = result;
    return (
        <div>
            <h1>결과</h1>
            <div className="flex gap-4">
                <div className="w-full">
                    <h2>내 결과</h2>
                    <p>
                        총 시간 : {getTime(myResult.elapsedTime).minutes}분 {getTime(myResult.totalTime).seconds}초
                    </p>
                    <p>오타 수 : {myResult.failedCount}개</p>
                    <p>
                        오타 시간 : {getTime(myResult.penaltyTime).minutes}분 {getTime(myResult.penaltyTime).seconds}초
                    </p>
                    <p>
                        총 시간 : {getTime(myResult.totalTime).minutes}분 {getTime(myResult.totalTime).seconds}초
                    </p>
                </div>
                <div className="w-full">
                    <h2>상대방 결과</h2>
                    <p>
                        총 시간 : {getTime(opponentResult.elapsedTime).minutes}분{' '}
                        {getTime(opponentResult.totalTime).seconds}초
                    </p>
                    <p>오타 수 : {opponentResult.failedCount}개</p>
                    <p>
                        오타 추가 시간 : {getTime(opponentResult.penaltyTime).minutes}분{' '}
                        {getTime(opponentResult.penaltyTime).seconds}초
                    </p>
                    <p>
                        총 시간 : {getTime(opponentResult.totalTime).minutes}분{' '}
                        {getTime(opponentResult.totalTime).seconds}초
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Result;
