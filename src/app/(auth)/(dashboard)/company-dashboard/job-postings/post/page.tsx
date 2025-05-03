'use client';

import JobPostingForm from '@/components/job-posting/JobPostingForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Page() {
  // const [defaultJobPosting, setDefaultJobPosting] = useState<JobPostingRequest | null>(null);
  const [isLoadJobPostingModalOpen, setIsLoadJobPostingModalOpen] = useState<boolean>(false);
  console.log(isLoadJobPostingModalOpen); // 삭제 (에러제거용)

  const handleClickLoadJobPosting = () => {
    setIsLoadJobPostingModalOpen(true);
  };

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <div className='flex justify-between border-b pb-2'>
        <h2 className='text-2xl font-bold'>채용 공고 등록</h2>
        {/* 모든 채용 공고 목록 모달 (클라이언트 컴포넌트로 분리) */}
        <Button
          className='bg-main-light hover:bg-main-dark cursor-pointer'
          onClick={handleClickLoadJobPosting}
        >
          불러오기
        </Button>
      </div>

      <JobPostingForm />
    </section>
  );
}
