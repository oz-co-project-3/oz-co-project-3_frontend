import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

interface LikePlusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LikePlusModal({ open, onOpenChange }: LikePlusModalProps) {
  const router = useRouter();
  const { user, isInitialized } = useAuthStore();

  if (!open) return null;

  const handleMoveToFavorite = () => {
    // 상태 복원은 완료됐는데 user가 없다면 로그인 필요
    if (isInitialized && !user) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/user/login');
      return;
    }

    // 로그인 상태면 이동
    router.push('/dashboard/job-seeker/job-postings/favorite');
  };

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
          <button
            className='bg-main h-[40px] w-[150px] rounded-sm text-white'
            onClick={(e) => {
              e.stopPropagation();
              handleMoveToFavorite();
            }}
          >
            관심공고 보러가기
          </button>
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
