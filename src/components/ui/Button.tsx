type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
};

const Button = ({ children, className = '', onClick }: ButtonProps) => {
    return (
        <button
            className={`px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xl font-semibold ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
