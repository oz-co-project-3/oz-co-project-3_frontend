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

export default function DeleteResumeButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    console.log(id, ': 삭제');
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className='bg-danger grow cursor-pointer px-2.5 py-5 text-white hover:bg-amber-700'
      >
        삭제
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>정말 삭제 하시겠습니까?</DialogTitle>
            <DialogDescription>삭제된 이력서는 복구할 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>취소</Button>
            <Button onClick={handleDelete}>삭제</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// 버튼 크기, 색상 바꾸기
