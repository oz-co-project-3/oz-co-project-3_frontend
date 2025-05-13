'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useChatbotStore } from '@/store/usechatbotStore';

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();
  const setIsNotFoundPage = useChatbotStore((state) => state.setIsNotFoundPage);

  useEffect(() => {
    console.error('[Error Page]', error);
    setIsNotFoundPage(true);
    return () => setIsNotFoundPage(false);
  }, [error, setIsNotFoundPage]);

  return (
    <div className='flex min-h-[calc(100vh-70px-64px)] flex-col items-center justify-center px-4 text-center'>
      <Image
        src='/500Character.png'
        alt='에러 캐릭터'
        width={160}
        height={160}
        className='mb-6'
        priority
      />

      <h1 className='text-muted-foreground text-3xl font-bold'>문제가 발생했습니다</h1>
      <p className='mt-2 text-sm text-gray-500'>
        예상치 못한 오류가 발생했어요. 다시 시도해주세요.
      </p>

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
