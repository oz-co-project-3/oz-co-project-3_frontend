'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useChatbotStore } from '@/store/usechatbotStore';

export default function NotFound() {
  const router = useRouter();
  const setIsNotFoundPage = useChatbotStore((state) => state.setIsNotFoundPage);

  useEffect(() => {
    setIsNotFoundPage(true);
    return () => setIsNotFoundPage(false); // 페이지 나가면 원상복구
  }, [setIsNotFoundPage]);

  return (
    <div className='flex min-h-[calc(100vh-70px-64px)] flex-col items-center justify-center px-4 text-center'>
      <Image
        src='/404Character.png'
        alt='404 캐릭터'
        width={160}
        height={160}
        className='mb-6'
        priority
      />
      <h1 className='text-muted-foreground text-3xl font-bold'>페이지를 찾을 수 없습니다</h1>
      <p className='mt-2 text-sm text-gray-500'>요청하신 주소가 존재하지 않거나 삭제되었습니다.</p>

      <div className='mt-6 flex gap-3'>
        <Button variant='outline' onClick={() => router.back()}>
          이전 페이지로
        </Button>
        <Button onClick={() => router.push('/')} className='bg-main-dark'>
          홈으로
        </Button>
      </div>
    </div>
  );
}
