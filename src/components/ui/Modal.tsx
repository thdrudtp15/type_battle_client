type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
    return (
        <div
            className="absolute h-screen w-screen top-0 left-0 bg-black/50 flex justify-center items-center"
            onClick={onClose}
        >
            <div className="bg-black text-white p-4 rounded-lg">{children}</div>
        </div>
    );
};

export default Modal;
