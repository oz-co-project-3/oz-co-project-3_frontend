import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// 링크 주소 수정필요

export function ConfirmButton({
  open,
  onClose,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(v) => (v ? undefined : onClose())}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-lg font-bold'>
            지원 시 기업 담당자의 이메일로 <br />
            이력서가 발송됩니다.
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-row justify-center gap-2 rounded-xl p-4'>
          <button className='bg-main h-[40px] w-[150px] rounded-sm text-white' onClick={onApply}>
            지원하기
          </button>
          <button className='h-[40px] w-[150px] rounded-sm border' onClick={onClose}>
            취소
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
