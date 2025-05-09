'use client';

import { useParams } from 'next/navigation';
import ApplyFlow from '../../ApplyFlow';
import LikeButton from '@/components/common/likebutton/LikedButton';

export default function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams<{ id: string }>();
  return (
    <div className='flex min-h-screen flex-col'>
      <div className='flex-grow'>{children}</div>
      <footer className='fixed bottom-0 left-0 z-50 flex h-[80px] w-full flex-row items-center justify-center gap-1 bg-white'>
        <div className='flex h-[50px] w-[50px] items-center justify-center rounded-2xl border'>
          <LikeButton id={params.id} is_bookmarked={params.is_bookmarked} />
        </div>
        <ApplyFlow id='1' />
      </footer>
    </div>
  );
}
