'use client';

import LikeButton from '@/components/common/likebutton/LikeButton';
import { useParams } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ id: string }>();
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex-grow'>{children}</div>
      <footer className='fixed bottom-0 left-0 z-50 h-[80px] w-full bg-white'>
        <button className='bg-main-light'>
          <span className='p-1 text-white'>지원하기</span>
        </button>
        <LikeButton id={params.id} />
      </footer>
    </div>
  );
}
