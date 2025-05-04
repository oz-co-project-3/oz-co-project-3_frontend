import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Link from 'next/link';

export default function SendResumeButton({
  open,
  onClose,
  onSend,
}: {
  open: boolean;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => (v ? undefined : onClose())}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-bold'>
            지원이 완료되었습니다.
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-row justify-center gap-2 rounded-xl p-4'>
          <Link href='/dashboard/job-postings/applied'>
            <button className='bg-main h-[40px] w-[150px] rounded-sm text-white' onClick={onSend}>
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
