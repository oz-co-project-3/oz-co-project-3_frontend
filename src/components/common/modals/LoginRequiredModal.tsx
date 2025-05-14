'use client';

import { useLoginModalStore } from '@/store/useLoginModalStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function LoginRequiredModal() {
  const { isOpen, close } = useLoginModalStore();
  const { user, isInitialized } = useAuthStore();

  const router = useRouter();

  const handleLogin = () => {
    close();
    router.push('/user/login');
  };

  // 로그인 확인되기 전에는 렌더 X
  if (!isInitialized) return null;

  // 로그인 상태면 모달 안 띄움
  if (user && isOpen) {
    close();
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle>로그인이 필요합니다</DialogTitle>
        </DialogHeader>
        <p className='mt-4 text-center'>이 기능을 사용하려면 로그인이 필요합니다.</p>
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
