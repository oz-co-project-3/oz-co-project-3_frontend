'use client';

import JobPostingItem from '@/components/common/jobposting-item';
import { Button } from '@/components/ui/button';
import jobPostings from '@/mock/jobPostings.json';
import { useSearchParams, useRouter } from 'next/navigation';

const PAGE_SIZE = 10;

export default function PriviteJobsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(jobPostings.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentJobs = jobPostings.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    router.push(`/public-jobs?page=${page}`);
  };
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>일반채용 정보</h1>
        <hr />
        <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>

        <div className='mb-10 flex space-x-2'>
          <Button>거리순</Button>
          <Button>인기순</Button>
          <Button>최신순</Button>
          <Button>관심분야</Button>
        </div>
        <div>
          <h2 className='text-2xl font-bold'>채용정보</h2>
          <section>
            <header className='flex flex-row justify-between border-b-2 bg-white py-2'>
              <span className='w-[150px] text-center'>근무지</span>
              <span className='w-[300px] text-center'>모집제목/기업명</span>
              <span className='w-[300px] text-center'>근무요약</span>
              <span className='w-[150px] text-center'>근무형태</span>
              <span className='w-[280px] text-center'>마감일</span>
            </header>
            <div className='gap-4'>
              {currentJobs.map((jobPosting) => (
                <JobPostingItem key={jobPosting.id} {...jobPosting} />
              ))}
            </div>
          </section>
          <div className='mt-8 flex justify-center space-x-2'>
            <Button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
              이전
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
              >
                {i + 1}
              </Button>
            ))}
            <Button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
              다음
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
