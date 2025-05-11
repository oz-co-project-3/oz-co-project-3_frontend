'use client';

import { Button } from '../ui/button';
import { useState } from 'react';
import { ApplicantsListModal } from './ApplicantsListModal';

export default function ApplicantsButton({ jobPostingId }: { jobPostingId: string }) {
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  return (
    <>
      <Button
        className='bg-main-light hover:bg-main-dark flex max-w-40 grow cursor-pointer items-center justify-center rounded-md p-2 py-5 text-white'
        onClick={() => setIsListModalOpen(true)}
      >
        지원자 이력서 보기
      </Button>
      {isListModalOpen && (
        <ApplicantsListModal
          open={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          jobPostingId={jobPostingId}
        />
      )}
    </>
  );
}
