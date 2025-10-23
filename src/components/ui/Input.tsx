type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
};

const Input = ({ value, onChange, onKeyDown, placeholder, className = '' }: InputProps) => {
    return (
        <input
            className={`px-4 py-2 border rounded-md ${className}`}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoFocus
        />
    );
};

export default Input;
