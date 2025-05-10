'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useResumes } from '@/hooks/useResumes';

interface ResumeModalProps {
  userId: number;
  open: boolean;
  onClose: () => void;
}

export function ResumeModal({ userId, open, onClose }: ResumeModalProps) {
  const router = useRouter();
  const { data: resumes = [], refetch } = useResumes(userId);

  // 매번 열릴 때마다 refetch (삭제 등 반영 하기 위해서)
  useEffect(() => {
    if (open) {
      refetch();
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
                  router.push(`/admin/resume/${resume.id}`);
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
