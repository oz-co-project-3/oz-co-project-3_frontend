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
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { ApplicantsResponse } from '@/types/applicants';

export function ApplicantsListModal({
  open,
  onClose,
  jobPostingId,
}: {
  open: boolean;
  onClose: () => void;
  jobPostingId: string;
}) {
  const router = useRouter();

  // TODO: 추후 로딩, 에러 처리 필요
  const {
    data: applicants,
    // isLoading,
    // error,
    // mutate
  } = useSWR<ApplicantsResponse[]>(`/api/applicants/corporate/${jobPostingId}/`, fetchOnClient);
  console.log(applicants);

  const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(null);

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
          <DialogTitle>지원자 이력서 목록</DialogTitle>
        </DialogHeader>

        <div className='space-y-2'>
          {applicants?.length === 0 ? (
            <p className='text-muted-foreground text-sm'>지원자가 없습니다.</p>
          ) : (
            <ul className='space-y-1'>
              {applicants?.map((applicant) => (
                <li
                  key={applicant.id}
                  className={`flex cursor-pointer items-center justify-between rounded-md border px-4 py-3 hover:bg-zinc-100 ${
                    selectedApplicantId === applicant.id ? 'bg-zinc-100' : ''
                  }`}
                  onClick={() => setSelectedApplicantId(applicant.id)}
                >
                  {/* 이력서 이름, 지원자 이름, 등등으로 바꿔주기 (현재 데이터 이상함) */}
                  {/* 유저: {applicant.user_id} / 이력서: {applicant.resume.id} */}
                  <div className='flex grow flex-col gap-1'>
                    <span className='text-sm'>{applicant.resume.title}</span>
                    <div className='flex gap-1'>
                      <span className='text-sm'>{applicant.resume.name}</span>
                      <span className='text-sm text-zinc-500'>({applicant.resume.email})</span>
                    </div>
                  </div>
                  {selectedApplicantId === applicant.id && (
                    <Check className='text-main-light h-4 w-4' />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        <DialogFooter>
          <Button
            className='bg-main-light hover:bg-main-dark cursor-pointer'
            disabled={!selectedApplicantId}
            onClick={async () => {
              try {
                // console.log(selectedResumeId);
                router.push(
                  `/dashboard/business/job-postings/current/${jobPostingId}/applicants?id=${selectedApplicantId}`,
                );
              } catch (error) {
                // TODO: 토스트?
                console.log('지원 실패:', error);
              }
            }}
          >
            이력서 보기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 지원 버튼이 또 필요함
// 취소 버튼
