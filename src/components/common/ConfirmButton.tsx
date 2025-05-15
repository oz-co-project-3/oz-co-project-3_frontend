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
  formId,
  extraClass,
}: {
  handleAction?: () => void;
  title: string;
  contentText: string;
  actionType: 'normal' | 'warning' | 'emphasis';
  formId?: string;
  extraClass?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  let conditionalClass = '';
  switch (actionType) {
    case 'normal':
      conditionalClass = 'bg-trnasparent text-black hover:bg-zinc-200 bg-zinc-100';
      break;
    case 'warning':
      conditionalClass = 'bg-danger hover:bg-amber-700 text-white';
      break;
    case 'emphasis':
      conditionalClass = 'bg-main-light hover:bg-main-dark text-white';
      break;
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        type='button'
        className={`${conditionalClass} ${extraClass} cursor-pointer rounded-md px-4 py-2 text-base max-sm:h-10`}
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
              type='button'
              onClick={() => setIsOpen(false)}
              className='hover:cursor-pointer'
            >
              취소
            </Button>
            <Button
              type={formId ? 'submit' : 'button'}
              form={formId ? formId : undefined}
              onClick={() => {
                if (handleAction) {
                  handleAction();
                }
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
