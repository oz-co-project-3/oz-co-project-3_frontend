'use client';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useResumes } from '@/hooks/useResumes';
import { ResumeListResponse } from '@/types/Schema/resumeSchema';
import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';
import { Check } from 'lucide-react';

export function ResumeListModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  // const router = useRouter();
  const {
    data: resumes,
    // error,
    // mutate,
    // isLoading,
  } = useSWR<ResumeListResponse>(`/api/resume/`, fetchOnClient);

  console.log(resumes);

  // 매번 열릴 때마다 mutate (삭제 등 반영 하기 위해서), 꼭 필요함?
  // useEffect(() => {
  //   if (open) {
  //     mutate();
  //   }
  // }, [open, mutate]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>이력서 목록</DialogTitle>
        </DialogHeader>

        <div className='space-y-2'>
          {resumes?.data.length === 0 ? (
            <p className='text-muted-foreground text-sm'>등록된 이력서가 없습니다.</p>
          ) : (
            <ul className='space-y-1'>
              {resumes?.data.map((resume) => (
                <li
                  key={resume.id}
                  className='flex cursor-pointer justify-between rounded-md border px-4 py-3 hover:bg-zinc-100'
                >
                  {/* <Button
                    variant='outline'
                    className='w-full justify-start'
                    onClick={() => {
                      // 지원할 이력서 선택 (선택된 이력서 상태로 저장?)
                      // router.push(`/admin/resume/${resume.id}/`);
                      // onClose();
                    }}
                  > */}
                  {resume.title}
                  <Check className='h-4 w-4' />
                  {/* </Button> */}
                </li>
              ))}
            </ul>
          )}
        </div>
        <DialogFooter>
          <Button type='submit' className='bg-main-light hover:bg-main-dark cursor-pointer'>
            지원
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 지원 버튼이 또 필요함
// 취소 버튼
