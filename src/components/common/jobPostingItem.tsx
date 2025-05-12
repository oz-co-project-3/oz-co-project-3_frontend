'use client';

import Link from 'next/link';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import LikedButton from './likebutton/LikedButton';
import LoginGuard from '@/components/common/guards/LoginGuard';

type JobPostingItemProps = {
  post: JobPostingResponse;
  detailPagePath: string;
};

export default function JobPostingItem({ post, detailPagePath }: JobPostingItemProps) {
  return (
    <div className='relative flex flex-col gap-4 rounded-md border px-8 py-6 transition-all duration-200 hover:bg-zinc-100 sm:justify-between'>
      <Link className='block' href={`${detailPagePath}/${post.id}`}>
        <div className='flex flex-row justify-between py-2'>
          {/* 근무지 */}
          <div className='flex h-[80px] w-[150px] flex-col items-center justify-center pl-2 text-center'>
            <span>{post.location}</span>
          </div>
          {/* 모집제목/기업명 */}
          <div className='flex h-[80px] w-[300px] flex-col justify-center text-center'>
            <span className='tegitxt-xl truncate font-black'>{post.title}</span>
            <span className='truncate'>{post.company}</span>
          </div>
          {/* 근무요약 */}
          <div className='flex h-[80px] w-[300px] flex-col justify-center text-center'>
            <span className='truncate'>{post.summary}</span>
          </div>
          {/* 근무형태 */}
          <div className='flex h-[80px] w-[150px] flex-col items-center justify-center'>
            <span className='w-15 rounded-sm bg-gray-200 text-center'>{post.employment_type}</span>
          </div>
          {/* 마감일 */}
          <div className='flex h-[80px] w-[280px] flex-col items-center justify-center'>
            <span>{post.deadline}</span>
          </div>
        </div>
      </Link>


      <div className='absolute top-14 right-2'>

        <LoginGuard>
          <LikedButton id={post.id} is_bookmarked={post.is_bookmarked} />
        </LoginGuard>
      </div>
    </div>
  );
}
