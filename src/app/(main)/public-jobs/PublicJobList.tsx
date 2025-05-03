'use client';

import JobPostingItem from '@/components/common/jobPostingItem';
import { useSearchParams, usePathname } from 'next/navigation';
import { JobPostingListResponse } from '@/types/jobPosting';
import CustomPagination from '@/components/common/pagination/CustomPagination';

export default function PublicJobList({
  data: { data: posts, total, limit },
}: {
  data: JobPostingListResponse;
}) {
  const searchParams = useSearchParams(); //쿼리 파라미터 가져와서
  const pathname = usePathname(); //현재 경로 가져와서

  const currentPage = parseInt(searchParams.get('page') || '0', 10); //현재 페이지 가져오기(쿼리파라미터 페이지로) 근데 없으면 1로 시작하기
  const totalPages = Math.ceil(total / limit); //전체 페이지 수 구하는데 올림하기

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
          {posts.map((post) => (
            <JobPostingItem key={post.id} {...post} detailPagePath='/public-jobs' />
          ))}
        </div>
      </section>
      <div className='mt-8 flex justify-center space-x-2'>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          createPageURL={createPageURL}
        />
      </div>
    </div>
  );
}
