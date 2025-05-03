'use client';

import LikeButton from '@/components/common/likebutton/LikeButton';
import { JobPosting } from '@/types/jobPosting';

export default function Layout({ id, children }: JobPosting & { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex-grow'>{children}</div>
      <footer className='fixed bottom-0 left-0 z-50 flex h-[80px] w-full flex-row items-center justify-center gap-1 bg-white'>
        <div className='flex h-[50px] w-[50px] items-center justify-center rounded-2xl border'>
          <LikeButton id={id} />
        </div>
        <button className='bg-main-light h-[50px] w-[500px] rounded-2xl'>
          <span className='p-1 text-white'>지원하기</span>
        </button>
      </footer>
    </div>
  );
}
