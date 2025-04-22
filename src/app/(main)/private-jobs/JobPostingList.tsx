'use client';

import JobPostingItem from '@/components/common/jobposting-item';
import jobPostings from '@/mock/jobPostings.json';
import { useSearchParams, usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PAGE_SIZE = 8;

export default function JobPostingList() {
  const searchParams = useSearchParams(); //쿼리 파라미터 가져와서
  const pathname = usePathname(); //현재 경로 가져와서

  const currentPage = parseInt(searchParams.get('page') || '1', 10); //현재 페이지 가져오기(쿼리파라미터 페이지로) 근데 없으면 1로 시작하기

  const totalPages = Math.ceil(jobPostings.length / PAGE_SIZE); //전체 페이지 수 구하는데 올림하기

  const startIndex = (currentPage - 1) * PAGE_SIZE; //현재 페이지에 시작하는 인덱스(인덱스는 0부터 시작하니까 -1)
  const endIndex = startIndex + PAGE_SIZE; //현재 페이지에 끝나는 인덱스(한페이지에 8개)
  const currentJobs = jobPostings.slice(startIndex, endIndex); //현재 페이지에 해당하는 채용정보만 가져오기

  const createPageURL = (page: number) => {
    //이동하는 Url 생성할거야
    const params = new URLSearchParams(searchParams); //쿼리 파라미터 복사해서 새로 만들기
    params.set('page', page.toString()); //복사한거에다 페이지 파라미터 새로 지정할거야
    return `${pathname}?${params.toString()}`; //현재 경로에 새로만든 쿼리 파라미터 붙여서 리턴
  };
  return (
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
                style={currentPage === totalPages ? { pointerEvents: 'none', opacity: 0.5 } : {}}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
