'use client';

import { useState } from 'react';

import { fetchOnClient } from '@/api/clientFetcher';
import { ApplyButton } from './ApplyButton';
import ConfirmButton from './ConfirmButton';
import SendResumeButton from './SendResumeButton';
import { useAuthStore } from '@/store/useAuthStore';
import { useLoginModalStore } from '@/store/useLoginModalStore';

export default function ApplyFlow({ id }: { id: string }) {
  const [openModal, setOpenModal] = useState<'apply' | 'confirm' | 'send' | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [sendResult, setSendResult] = useState<'success' | 'fail' | null>(null);

  const { user } = useAuthStore();
  const { open: openLoginModal, setRedirectPath } = useLoginModalStore();

  //지원하기
  const handleApply = async () => {
    if (!selectedResumeId) return;
    try {
      await fetchOnClient(`/api/postings/${id}/applicant/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resume: Number(selectedResumeId), // 이력서 id
          status: '지원 중', // 상태
          memo: '',
        }),
      });
      setSendResult('success');
      console.log('지원성공');
    } catch (e) {
      setSendResult('fail');
      console.error('지원실패', e);
    }
    setOpenModal('send');
  };

  return (
    <>
      <ApplyButton
        open={openModal === 'apply'}
        onClose={() => setOpenModal(null)}
        onConfirm={() => setOpenModal('confirm')}
        selectedResumeId={selectedResumeId}
        setSelectedResumeId={setSelectedResumeId}
      />
      <ConfirmButton
        open={openModal === 'confirm'}
        onClose={() => setOpenModal('apply')}
        onApply={handleApply}
      />
      <SendResumeButton
        open={openModal === 'send'}
        onClose={() => setOpenModal(null)}
        result={sendResult}
      />

      <button
        className='bg-main-light flex h-[50px] w-[500px] cursor-pointer items-center justify-center rounded-2xl text-white'
        onClick={() => {
          if (!user) {
            setRedirectPath(`/postings/${id}`);
            openLoginModal();
            return;
          }
          setOpenModal('apply');
        }}
      >
        지원하기
      </button>
    </>
  );
}
