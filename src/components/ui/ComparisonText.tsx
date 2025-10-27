type ComparisonProps = {
    sentence: string;
    text: string;
};

const ComparisonText = ({ sentence, text }: ComparisonProps) => {
    return (
        <div>
            <div>
                {sentence.split('').map((char, index) => {
                    return (
                        <span
                            key={index}
                            className={`${
                                index >= text.length
                                    ? 'text-gray-400'
                                    : text[index] === char
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
