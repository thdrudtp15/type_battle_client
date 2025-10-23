import React from 'react';
import type { TypingLogType } from '../../types/typingLog';
import ComparisonText from '../ui/ComparisonText';

const TypingLog = ({ log }: { log: TypingLogType[] }) => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            {log.map((item, index) => (
                <div className="flex flex-col " key={index}>
                    <span>
                        <ComparisonText sentence={item.sentence} typing={item.typing} />
                    </span>
                    <span>{item.typing}</span>
                </div>
            ))}
        </div>
    );
};

export default React.memo(TypingLog);
