'use client';

import { fetchOnClient } from '@/api/clientFetcher';
import { Button } from '../ui/button';
import { ResumeListModal } from './ResumeListModal';
import { useState } from 'react';
import useSWRMutation from 'swr/mutation';

export default function ApplyButton({ jobPostingId }: { jobPostingId: string }) {
  const [isListModalOpen, setIsListModalOpen] = useState(false);

  const { trigger } = useSWRMutation(
    `/api/postings/${jobPostingId}/applicant/`,
    async (url: string, { arg }: { arg: number }) => {
      return fetchOnClient(url, {
        method: 'POST',
        body: JSON.stringify({
          resume: arg.toString(),
          status: '지원 중',
          memo: '',
        }),
      });
    },
  );

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
          open={isListModalOpen}
          onClose={() => setIsListModalOpen(false)}
          action={trigger}
        />
      )}
    </>
  );
}
