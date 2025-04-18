'use client';

import JobPostingItem from '@/components/common/jobposting-item';
import { Button } from '@/components/ui/button';
import jobPostings from '@/mock/jobPostings.json';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';
import FilterList from '../private-jobs/FilterList';

const PAGE_SIZE = 8;

export default function PublicJobsPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const totalPages = Math.ceil(jobPostings.length / PAGE_SIZE);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const currentJobs = jobPostings.slice(startIndex, endIndex);

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>공공일자리 정보</h1>
        <hr />
        <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>

        <div className='mb-10 flex space-x-2'>
          <FilterList />
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
            <Pagination>
              <PaginationContent>
                {/* 이전 버튼 */}
                <PaginationItem>
                  <PaginationPrevious
                    href={createPageURL(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : 0}
                    style={currentPage === 1 ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                  />
                </PaginationItem>
                {/* 페이지 번호 */}
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i + 1}>
                    <PaginationLink href={createPageURL(i + 1)} isActive={currentPage === i + 1}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {/* 다음 버튼 */}
                <PaginationItem>
                  <PaginationNext
                    href={createPageURL(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : 0}
                    style={
                      currentPage === totalPages ? { pointerEvents: 'none', opacity: 0.5 } : {}
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
    </div>
  );
}
