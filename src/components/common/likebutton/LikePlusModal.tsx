import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import Link from 'next/link';

interface LikePlusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LikePlusModal({ open, onOpenChange }: LikePlusModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className='sm:max-w-[425px]'
        onClick={(e) => e.stopPropagation()}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-bold'>
            관심공고로 지정되었습니다
            <br />
            관심공고는 마이페이지에서 확인 가능합니다.
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-row justify-center gap-2 rounded-xl p-4'>
          <Link href='/dashboard/job-seeker/job-postings/favorite'>
            <button
              className='bg-main h-[40px] w-[150px] rounded-sm text-white'
              onClick={(e) => e.stopPropagation()}
            >
              관심공고 보러가기
            </button>
          </Link>
          <DialogClose asChild>
            <button
              className='h-[40px] w-[150px] rounded-sm border'
              onClick={(e) => e.stopPropagation()}
            >
              닫기
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
