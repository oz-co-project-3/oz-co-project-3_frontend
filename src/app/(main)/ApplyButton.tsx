import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Link from 'next/link';
import { useState } from 'react';
//이력서 불러오기 필요
// 링크 주소 수정 필요

export function ApplyButton({
  open,
  onClose,
  onConfirm,
  id,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  id: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Dialog open={open} onOpenChange={(v) => (v ? undefined : onClose())}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>지원하기</DialogTitle>
          <DialogDescription>지원할 이력서를 선택하세요</DialogDescription>
        </DialogHeader>
        <ul className='flex flex-col gap-2 rounded-xl bg-[#fafbfc] p-4'>
          <li className='flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-sm'>
            <label htmlFor='resume1' className='flex cursor-pointer items-start gap-3'>
              <input
                type='radio'
                name='resume'
                id='resume1'
                className='mt-1 h-5 w-5 accent-blue-500'
                checked={selected === 'resume1'}
                onChange={() => {
                  setSelected('resume1');
                }}
              />
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-[#8b95a1]'>
                    2025.04.10 (목) 16:34 저장
                  </span>
                </div>
                <div className='mt-1 flex items-center gap-1 text-base font-medium'>이력서1</div>
                <div className='mt-2 flex items-center gap-2 text-sm text-[#8b95a1]'></div>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <Link href={`/dashboard/resume/${id}/edit`}>
                  <button className='font-medium text-[#8b95a1]'>수정</button>
                </Link>
                <Link href={`/dashboard/resume/${id}`}>
                  <button className='font-medium text-[#8b95a1]'>미리보기</button>
                </Link>
              </div>
            </label>
          </li>

          {/* 예시로 넣어둠 */}
          <li className='flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-sm'>
            <label htmlFor='resume2' className='flex cursor-pointer items-start gap-3'>
              <input
                type='radio'
                name='resume'
                id='resume2'
                className='mt-1 h-5 w-5 accent-blue-500'
              />
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-[#8b95a1]'>
                    2025.04.10 (목) 16:34 저장
                  </span>
                </div>
                <div className='mt-1 flex items-center gap-1 text-base font-medium'>이력서1</div>
                <div className='mt-2 flex items-center gap-2 text-sm text-[#8b95a1]'></div>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <button className='font-medium text-[#8b95a1]'>수정</button>
                <button className='font-medium text-[#8b95a1]'>미리보기</button>
              </div>
            </label>
          </li>
          <li className='flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-sm'>
            <label htmlFor='resume3' className='flex items-start gap-3'>
              <input
                type='radio'
                name='resume'
                id='resume3'
                className='mt-1 h-5 w-5 accent-blue-500'
              />
              <div className='flex-1'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium text-[#8b95a1]'>
                    2025.04.10 (목) 16:34 저장
                  </span>
                </div>
                <div className='mt-1 flex items-center gap-1 text-base font-medium'>이력서1</div>
                <div className='mt-2 flex items-center gap-2 text-sm text-[#8b95a1]'></div>
              </div>
              <div className='flex flex-col items-end gap-1'>
                <button className='font-medium text-[#8b95a1]'>수정</button>
                <button className='font-medium text-[#8b95a1]'>미리보기</button>
              </div>
            </label>
          </li>
        </ul>
        <div className='flex justify-center'>
          <button
            className={`h-[40px] w-[150px] rounded-sm text-white ${selected ? 'bg-main' : 'bg-gray-300'} disabled:bg-gray-300`}
            disabled={!selected}
            onClick={onConfirm}
          >
            선택완료
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
