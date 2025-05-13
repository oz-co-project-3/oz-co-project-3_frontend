'use client';

import { useState } from 'react';
import ResumeForm from '@/components/resume/ResumeForm';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [isLoadResumeModalOpen, setIsLoadResumeModalOpen] = useState<boolean>(false);
  console.log(isLoadResumeModalOpen); // 삭제 (에러제거용)

  const handleClickLoadResume = () => {
    setIsLoadResumeModalOpen(true);
  };

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <div className='flex justify-between border-b pb-2'>
        <h2 className='text-2xl font-bold'>이력서 작성</h2>
        {/* 모든 채용 공고 목록 모달 (클라이언트 컴포넌트로 분리) */}
        <Button
          className='bg-main-light hover:bg-main-dark cursor-pointer'
          onClick={handleClickLoadResume}
        >
          불러오기
        </Button>
      </div>

      <ResumeForm />
    </section>
  );
}
