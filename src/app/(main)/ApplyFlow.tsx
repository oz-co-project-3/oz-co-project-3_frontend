import { useState } from 'react';
import { ApplyButton } from './ApplyButton';
import { ConfirmButton } from './ConfirmButton';
import SendResumeButton from './SendResumeButton';

export default function ApplyFlow({ id }: { id: string }) {
  const [openModal, setOpenModal] = useState<'apply' | 'confirm' | 'send' | null>(null);

  return (
    <>
      <ApplyButton
        id={id}
        open={openModal === 'apply'}
        onClose={() => setOpenModal(null)}
        onConfirm={() => setOpenModal('confirm')}
      />
      <ConfirmButton
        open={openModal === 'confirm'}
        onClose={() => setOpenModal('apply')}
        onApply={() => setOpenModal('send')}
      />
      <SendResumeButton
        open={openModal === 'send'}
        onClose={() => setOpenModal(null)}
        onSend={() => setOpenModal(null)}
      />

      <button
        className='bg-main-light flex h-[50px] w-[500px] cursor-pointer items-center justify-center rounded-2xl text-white'
        onClick={() => setOpenModal('apply')}
      >
        지원하기
      </button>
    </>
  );
}
