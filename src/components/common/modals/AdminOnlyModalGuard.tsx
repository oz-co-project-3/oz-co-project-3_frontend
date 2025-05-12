// 관리자 전용 기능 모달 띄우는 용도
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export default function AdminOnlyModalGuard({ children }: Props) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [canRender, setCanRender] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // user가 null이 아니거나 확인이 완료되면 체크
    if (user !== undefined) {
      setChecked(true);

      if (!user || !user.user_type?.includes('admin')) {
        setShowModal(true);
      } else {
        setCanRender(true);
      }
    }
  }, [user]);

  const handleMoveHome = () => {
    setShowModal(false);
    router.replace('/');
  };

  if (!checked) return null;

  return (
    <>
      {canRender && children}
      <Dialog open={showModal} onOpenChange={handleMoveHome}> {/* onClose 시 홈으로 */}
        <DialogContent className='max-w-sm'>
          <DialogHeader>
            <DialogTitle>관리자 전용 페이지입니다</DialogTitle>
          </DialogHeader>
          <p className='text-center mt-4'>해당 페이지는 관리자만 접근할 수 있습니다.</p>
          <DialogFooter className='mt-6 flex flex-col gap-2'>
            <Button className='bg-main-light text-white' onClick={handleMoveHome}>
              홈으로 이동
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
