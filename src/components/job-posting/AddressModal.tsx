// import { Button } from '@/components/ui/button';
import { forwardRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  content: React.ReactNode;
};

// ref 전달 받고 않음. (일단 킵)
function AddressModal({ isOpen, closeModal, content }: ModalProps, ref: React.Ref<HTMLDivElement>) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className='bg-opacity-50 fixed inset-0 z-10 flex items-center justify-center bg-black/60'
        onClick={closeModal}
      />
      <div
        ref={ref}
        className='fixed top-1/2 left-1/2 z-20 w-auto -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-zinc-100'
      >
        {/* 닫기 버튼 */}
        {/* <Button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={closeModal}
        >
          &times;
        </Button> */}
        <h4 className='flex items-center justify-center p-6'>주소 검색</h4>
        <div>{content}</div>
      </div>
    </>
  );
}

export default forwardRef<HTMLDivElement, ModalProps>(AddressModal);
