type ComparisonProps = {
    sentence: string;
    typing: string;
};

const ComparisonText = ({ sentence, typing }: ComparisonProps) => {
    return (
        <div>
            <div>
                {sentence.split('').map((char, index) => {
                    return (
                        <span
                            key={index}
                            className={`${
                                index >= typing.length
                                    ? 'text-gray-400'
                                    : typing[index] === char
                                    ? 'text-blue-500'
                                    : 'text-red-500'
                            }`}
                        >
                            {char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default ComparisonText;
