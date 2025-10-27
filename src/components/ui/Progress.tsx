import { motion } from 'framer-motion';

type ProgressProps = {
    value: number;
    color: string;
    children?: React.ReactNode;
};

const Progress = ({ value, color, children }: ProgressProps) => {
    return (
        <div>
            <div className="flex justify-between">{children}</div>
            <div className="h-1 rounded-full w-40 bg-gray-500 relative overflow-hidden">
                <motion.div className={`h-full ${color}`} initial={{ width: 0 }} animate={{ width: `${value}%` }} />
            </div>
        </div>
    );
};

export default Progress;

const Title = ({ children }: { children: React.ReactNode }) => {
    return <span className="text-sm text-gray-500">{children}</span>;
};
const Value = ({ children }: { children: React.ReactNode }) => {
    return <span className="text-sm text-black">{children}</span>;
};
Progress.Title = Title;
Progress.Value = Value;
