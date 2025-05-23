'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';

export default function SendResumeButton({
  open,
  onClose,
  result,
}: {
  open: boolean;
  onClose: () => void;
  result?: 'success' | 'fail' | null;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => (v ? undefined : onClose())}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-bold'>
            {result === 'success'
              ? '지원이 완료되었습니다.'
              : '지원이 실패했습니다. 다시 시도해주세요'}
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-row justify-center gap-2 rounded-xl p-4'>
          <Link href='/dashboard/job-seeker/job-postings/applied'>
            <button className='bg-main h-[40px] w-[150px] rounded-sm text-white' onClick={onClose}>
              지원내역 보러가기
            </button>
          </Link>
          <button className='h-[40px] w-[150px] rounded-sm border' onClick={onClose}>
            닫기
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
