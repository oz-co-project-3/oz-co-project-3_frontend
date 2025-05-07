'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useResumes } from '@/hooks/useResumes';

interface ResumeModalProps {
  userId: number;
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ userId, open, onClose }: ResumeModalProps) {
  const router = useRouter();
  const { data: resumes, refetch } = useResumes(userId);
  const didRefetch = useRef(false); // refetch 무한 호출 방지

  useEffect(() => {
    if (open && !didRefetch.current) {
      refetch();
      didRefetch.current = true;
    }

    // 모달 닫힐 때 다시 refetch 허용
    if (!open) {
      didRefetch.current = false;
    }
  }, [open, refetch]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>이력서 목록</DialogTitle>
        </DialogHeader>

        <div className='space-y-2'>
          {resumes.length === 0 ? (
            <p className='text-muted-foreground text-sm'>등록된 이력서가 없습니다.</p>
          ) : (
            resumes.map((resume) => (
              <Button
                key={resume.id}
                variant='outline'
                className='w-full justify-start'
                onClick={() => {
                  router.push(`/admin/resume/${resume.id}/`);
                  onClose();
                }}
              >
                {resume.title}
              </Button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
