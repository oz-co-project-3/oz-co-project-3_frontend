'use client';

import { fetchOnClient } from '@/api/clientFetcher';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import Link from 'next/link';
import useSWR from 'swr';
//이력서 불러오기 필요
// 링크 주소 수정 필요

interface ResumeListResponse {
  data: ResumeListItem[];
}

interface ResumeListItem {
  id: string;
  title: string;
  updated_at: string;
}

export function ApplyButton({
  open,
  onClose,
  onConfirm,
  selectedResumeId,
  setSelectedResumeId,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  selectedResumeId: string | null;
  setSelectedResumeId: (id: string) => void;
}) {
  const {
    data: response,
    isLoading,
    // error,
  } = useSWR<ResumeListResponse>(open ? '/api/resume/' : null, fetchOnClient);
  const resumes = response?.data ?? [];
  return (
    <Dialog open={open} onOpenChange={(v) => (v ? undefined : onClose())}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>지원하기</DialogTitle>
          <DialogDescription>
            {isLoading
              ? '이력서를 불러오는 중입니다...'
              : resumes.length > 0
                ? '지원할 이력서를 선택하세요'
                : '작성된 이력서가 없습니다'}
          </DialogDescription>
        </DialogHeader>

        {/* 이력서가 있을 때만 리스트 렌더링 */}
        {resumes.length > 0 && (
          <ul className='flex flex-col gap-2 rounded-xl bg-[#fafbfc] p-4'>
            {resumes.map((resume) => (
              <li
                key={resume.id}
                className='flex flex-col gap-2 rounded-lg bg-white px-4 py-3 shadow-sm'
              >
                <label htmlFor={resume.id} className='flex cursor-pointer items-start gap-3'>
                  <input
                    type='radio'
                    name='resume'
                    id={resume.id}
                    className='mt-1 h-5 w-5 accent-blue-500'
                    checked={selectedResumeId === resume.id}
                    onChange={() => {
                      console.log('선택된 이력서 ID:', resume.id);
                      setSelectedResumeId(resume.id);
                    }}
                  />
                  <div className='flex-1'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium text-[#8b95a1]'>
                        {format(resume.updated_at, 'yyyy-MM-dd')} 저장
                      </span>
                    </div>
                    <div className='mt-1 flex items-center gap-1 text-base font-medium'>
                      {resume.title}
                    </div>
                  </div>
                  {/* 수정 코드 나오면 돌아오는 코드 추가하기  */}
                  <div className='flex flex-col items-end gap-1'>
                    <Link href={`/dashboard/job-seeker/resume/${resume.id}/edit`}>
                      <button className='font-medium text-[#8b95a1]'>수정</button>
                    </Link>
                    <button
                      className='font-medium text-[#8b95a1]'
                      onClick={() =>
                        window.open(
                          `/dashboard/job-seeker/resume/${resume.id}`,
                          '_blank',
                          'noopener,noreferrer',
                        )
                      }
                    >
                      미리보기
                    </button>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        )}

        {/* 이력서가 없을 때 안내 메시지 */}
        {resumes.length === 0 && (
          <div className='flex flex-col items-center justify-center py-8'>
            <span className='text-lg text-gray-500'>작성된 이력서가 없습니다.</span>
            <Link href='/dashboard/job-seeker/resume'>
              <button className='bg-main mt-4 rounded px-4 py-2 text-white'>이력서 작성하기</button>
            </Link>
          </div>
        )}

        {/* 선택완료 버튼: 이력서가 있을 때만 활성화 */}
        {resumes.length > 0 && (
          <div className='flex justify-center'>
            <button
              className={`h-[40px] w-[150px] rounded-sm text-white ${selectedResumeId ? 'bg-main' : 'bg-gray-300'} disabled:bg-gray-300`}
              disabled={!selectedResumeId}
              onClick={onConfirm}
            >
              선택완료
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
