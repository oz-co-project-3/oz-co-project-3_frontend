'use client';

import JobPostingItem from '@/components/common/jobPostingItem';
import { useSearchParams, usePathname } from 'next/navigation';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';
import CustomPagination from '@/components/common/pagination/CustomPagination';
import RecentPostingsCard from '@/components/job-posting/RecentPostingsCard';

export default function PrivateJobList({
  data: { data: posts, total, limit },
}: {
  data: JobPostingListResponse;
}) {
  const searchParams = useSearchParams(); //쿼리 파라미터 가져와서
  const pathname = usePathname(); //현재 경로 가져와서

  const currentPage = parseInt(searchParams.get('page') || '1', 12); //현재 페이지 가져오기(쿼리파라미터 페이지로) 근데 없으면 1로 시작하기
  const totalPages = Math.ceil(total / limit); //전체 페이지 수 구하는데 올림하기

  const createPageURL = (page: number) => {
    //이동하는 Url 생성할거야
    const params = new URLSearchParams(searchParams); //쿼리 파라미터 복사해서 새로 만들기
    params.set('page', page.toString()); //복사한거에다 페이지 파라미터 새로 지정할거야
    return `${pathname}?${params.toString()}`; //현재 경로에 새로만든 쿼리 파라미터 붙여서 리턴
  };
  console.log(posts);

  return (
    <div>
      <section>
        <ul className='flex flex-row justify-between rounded-md border border-b-2 bg-white py-2 max-lg:hidden'>
          <li className='w-[150px] text-center'>근무지</li>
          <li className='w-[300px] text-center'>모집제목/기업명</li>
          <li className='w-[300px] text-center'>근무요약</li>
          <li className='w-[150px] text-center'>근무형태</li>
          <li className='w-[280px] text-center'>마감일</li>
        </ul>
        <div className='gap-4 max-lg:hidden'>
          {posts.map((post) => (
            <JobPostingItem key={post.id} post={post} detailPagePath='/private-jobs' />
          ))}
        </div>

        {/* 모바일 */}
        <div className='max-lg:grid max-lg:grid-cols-3 max-lg:gap-2 max-md:grid max-md:grid-cols-2 max-sm:flex max-sm:flex-col max-sm:gap-4 lg:hidden'>
          {posts.map((post) => (
            <RecentPostingsCard key={post.id} jobPosting={post} />
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
