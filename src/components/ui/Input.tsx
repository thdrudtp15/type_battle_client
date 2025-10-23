type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    className?: string;
    disabled?: boolean;
    ref?: React.RefObject<HTMLInputElement | null>;
};

const Input = ({ value, onChange, onKeyDown, placeholder, className = '', disabled = false, ref }: InputProps) => {
    return (
        <input
            className={`px-4 py-2 border rounded-md ${className}`}
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoFocus
            disabled={disabled}
            ref={ref}
        />
    );
};

export default Input;
