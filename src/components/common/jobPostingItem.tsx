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
    <div className='relative'>
      <Link className='block' href={`${detailPagePath}/${post.id}`}>
        <div className='flex flex-row justify-between border-b-2 bg-white py-2 hover:shadow-lg'>
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

      <div className='absolute top-8 right-2'>
        <LoginGuard>
          <LikedButton id={post.id} is_bookmarked={post.is_bookmarked} />
        </LoginGuard>
      </div>
    </div>
  );
}
