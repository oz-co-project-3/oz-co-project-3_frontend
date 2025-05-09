// 페이지 내에서 모달을 띄우는 용도

'use client';

import { useLoginModalStore } from '@/store/useLoginModalStore';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function LoginRequiredModal() {
  const { isOpen, close } = useLoginModalStore();
  const router = useRouter();

  const handleLogin = () => {
    close();
    router.push('/user/login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>로그인이 필요합니다</DialogTitle>
        </DialogHeader>
        <p className='text-center mt-4'>이 기능을 사용하려면 로그인이 필요합니다.</p>
        <DialogFooter className='mt-6 flex flex-col gap-2'>
          <Button className='bg-main-light text-white' onClick={handleLogin}>
            로그인 하러가기
          </Button>
          <Button variant='outline' onClick={close}>
            닫기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
