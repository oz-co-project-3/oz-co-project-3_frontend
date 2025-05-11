'use client';

// import useSWRMutation from 'swr/mutation';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import ConfirmButton from '../common/ConfirmButton';
import { deleteJobPosting } from '@/api/jobPosting';

export default function BusinessButtonBundle({ id }: { id: string }) {
  const router = useRouter();

  // const { trigger: extendDeadlineTrigger } = useSWRMutation();

  // const { trigger: viewApplicantsTrigger } = useSWRMutation();

  return (
    <>
      <div className='z-10 flex max-w-[300px] flex-wrap items-center gap-2 sm:justify-end'>
        <Button
          variant='outline'
          // onClick={() => extendDeadlineTrigger(id)}
          className='w-[48%] min-w-[100px] cursor-pointer'
        >
          마감일 연장
        </Button>
        <Button
          variant='outline'
          // onClick={() => viewApplicantsTrigger(id)}
          className='bg-main-light hover:bg-main-dark w-[48%] min-w-[100px] cursor-pointer text-white hover:text-white'
        >
          지원자 보기
        </Button>
        <Button
          variant='outline'
          onClick={() => router.push(`/dashboard/business/job-postings/current/${id}/edit`)}
          className='w-[48%] min-w-[100px] cursor-pointer'
        >
          수정
        </Button>
        <ConfirmButton
          handleAction={() => deleteJobPosting(id)}
          title='삭제'
          contentText='삭제한 공고는 복구할 수 없습니다.'
          actionType='warning'
          extraClass='w-[48%] min-w-[100px]'
        />
      </div>
    </>
  );
}
