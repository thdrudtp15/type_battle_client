import { FaCheck, FaEquals } from 'react-icons/fa';

export const getCompareIcon = (compare: 'over' | 'under' | 'equal') => {
    switch (compare) {
        case 'over':
            return <FaCheck className="w-3 h-3 text-green-500" />;
        case 'under':
            return '';
        case 'equal':
            return <FaEquals className="w-3 h-3 text-yellow-500" />;
    }
};

export const getCompareResult = (a: number, b: number) => {
    if (a > b) {
        return 'over';
    } else if (a < b) {
        return 'under';
    } else {
        return 'equal';
    }
};
