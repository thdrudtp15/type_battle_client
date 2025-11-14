import React from 'react';
import Modal from '../ui/Modal';
import { useQuery } from '@tanstack/react-query';

type ContactModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ContactModal = React.memo(({ isOpen, onClose }: ContactModalProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['server'],
        queryFn: () =>
            fetch('http://localhost:3001/server').then((res) => {
                if (!res.ok) {
                    throw new Error('Server is not running');
                }
                return res.json();
            }),
        enabled: isOpen,
    });
    console.log(data, isLoading, error);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log('제출된 데이터:', formData);

        // 여기에 전송 로직 추가 가능
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="CONTACT">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* 제목 */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#d1d0c5] mb-2">
                        제목
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-2 bg-modal-dark border border-gray-700 rounded-lg text-[#d1d0c5] focus:outline-none focus:border-[#e2b714] focus:ring-1 focus:ring-[#e2b714] transition-colors placeholder:text-[#646669]"
                        placeholder="문의 제목을 입력하세요"
                    />
                </div>

                {/* 메시지 */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#d1d0c5] mb-2">
                        메시지
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full px-4 py-2 bg-modal-dark border border-gray-700 rounded-lg text-[#d1d0c5] focus:outline-none focus:border-[#e2b714] focus:ring-1 focus:ring-[#e2b714] transition-colors resize-none placeholder:text-[#646669]"
                        placeholder="문의 내용을 입력하세요"
                    />
                </div>

                {/* 제출 버튼 */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2 bg-modal-dark border border-gray-700 text-[#d1d0c5] rounded-lg hover:border-[#646669] transition-colors"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-[#e2b714] text-[#323437] rounded-lg font-semibold hover:bg-[#f5c842] transition-colors"
                    >
                        전송
                    </button>
                </div>
            </form>
        </Modal>
    );
});

export default ContactModal;
