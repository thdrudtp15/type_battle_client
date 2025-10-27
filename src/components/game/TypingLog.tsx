import React from 'react';

import ComparisonText from '../ui/ComparisonText';

import type { TypingLogType } from '../../types/typingLog';

const TypingLog = ({ log }: { log: TypingLogType[] }) => {
    return (
        <div className="flex flex-col gap-5 items-center justify-center max-h-[300px] overflow-y-auto">
            {log.map((item, index) => (
                <div className="flex flex-col " key={index}>
                    <span>
                        <ComparisonText sentence={item.sentence} text={item.typing} />
                    </span>
                    <span>{item.typing}</span>
                </div>
            ))}
        </div>
    );
};

export default React.memo(TypingLog);
