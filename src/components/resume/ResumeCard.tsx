import Link from 'next/link';
import DeleteResumeButton from './DeleteResumeButton';
import { ResumeResponse } from '@/types/Schema/resumeSchema';
import { formatDate } from 'date-fns';

export default async function ResumeCard({ resume }: { resume: ResumeResponse }) {
  return (
    <article className='relative flex flex-col gap-2 rounded-md border lg:flex-row'>
      <Link
        href={`/dashboard/job-seeker/resume/${resume.id}`}
        className='absolute inset-0 grow p-4'
      >
        <span className='sr-only'>이력서 상세보기</span>
      </Link>

      <div className='flex grow flex-col gap-2 p-4'>
        <h3 className='pb-2 text-lg font-bold'>{resume.title}</h3>
        <p>경력: {resume.work_experiences.map((experience) => experience.company).join(', ')}</p>
        <div className='flex gap-8'>
          <span>
            <span className='text-zinc-500'>희망 직종:</span> {resume.interests}
          </span>
          <span>
            <span className='text-zinc-500'>관심 지역:</span> {resume.desired_area}
          </span>
          <span>
            <span className='text-zinc-500'>최종 수정일:</span>{' '}
            {formatDate(resume.updated_at, 'yyyy-MM-dd')}
          </span>
        </div>
      </div>

      <div className='z-10 flex min-w-32 gap-2 p-4 max-lg:pt-2 lg:flex-col'>
        <Link
          href={`/dashboard/job-seeker/resume/${resume.id}/edit`}
          className='bg-main-light hover:bg-main-dark flex grow cursor-pointer items-center justify-center rounded-md p-2 text-white'
        >
          수정
        </Link>
        <DeleteResumeButton id={`${resume.id}`} />
      </div>
    </article>
  );
}
