'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

export default function ConfirmButton({
  handleAction,
  title,
  contentText,
  actionType,
}: {
  handleAction: () => void;
  title: string;
  contentText: string;
  actionType: 'normal' | 'warning' | 'emphasis';
}) {
  const [isOpen, setIsOpen] = useState(false);

  let extraClass = '';
  switch (actionType) {
    case 'normal':
      extraClass = 'bg-trnasparent text-black hover:bg-zinc-200 bg-zinc-100';
      break;
    case 'warning':
      extraClass = 'bg-danger hover:bg-amber-700 text-white';
      break;
    case 'emphasis':
      extraClass = 'bg-main-light hover:bg-main-dark text-white';
      break;
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`${extraClass} grow cursor-pointer rounded-md px-2.5 py-5`}
      >
        {title}
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말 {title} 하시겠습니까?</DialogTitle>
            <DialogDescription className='py-2'>{contentText}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsOpen(false)}
              className='hover:cursor-pointer'
            >
              취소
            </Button>
            <Button
              onClick={() => {
                handleAction();
                setIsOpen(false);
              }}
              className='bg-main-light hover:bg-main-dark hover:cursor-pointer'
            >
              확인
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// 버튼 크기, 색상 바꾸기
