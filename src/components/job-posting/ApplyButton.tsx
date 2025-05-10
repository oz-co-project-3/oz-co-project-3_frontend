'use client';

// import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '../ui/button';
import { ResumeListModal } from './ResumeListModal';
import { useState } from 'react';

export default function ApplyButton() {
  // const { user } = useAuthStore();
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  return (
    <>
      <Button
        className='bg-main-light hover:bg-main-dark flex grow cursor-pointer items-center justify-center rounded-md p-2 py-5 text-white'
        onClick={() => setIsListModalOpen(true)}
      >
        지원 하기
      </Button>
      {isListModalOpen && (
        <ResumeListModal
          // userId={user.id}
          open={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
        />
      )}
    </>
  );
}
