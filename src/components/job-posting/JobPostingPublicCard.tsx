import { getBriefLocation } from '@/lib/utils';
import {
  AppliedJobPosting,
  FavoriteJobPosting,
  JobPostingResponse,
} from '@/types/Schema/jobPostingSchema';
import Image from 'next/image';
import Link from 'next/link';

export default async function JobPostingPublicCard({
  jobPosting,
  path,
}: {
  jobPosting: JobPostingResponse | FavoriteJobPosting | AppliedJobPosting;
  path: 'applied' | 'favorite';
}) {
  // 여기선 intanceof 사용할 수 없음. (여긴 런타임이라서 타입 체크 불가능)

  return (
    <div className='relative flex w-[32%] cursor-pointer flex-col overflow-hidden rounded-md border transition-all duration-150 hover:scale-105'>
      <Link
        href={`/dashboard/job-seeker/job-postings/${path}/${jobPosting.id}`}
        className='absolute inset-0 z-10 grow'
      >
        <span className='sr-only'>공고 상세보기</span>
      </Link>

      <div className='relative h-[150px] w-full'>
        <Image
          // 일단 임시로 이미지 없을땐, 랜덤 이미지
          src={jobPosting?.image_url ?? 'https://picsum.photos/300/200?random=1'}
          alt='job-posting-card'
          fill
          draggable={false}
          unoptimized
          className='z-0 border-b border-gray-300 object-cover'
        />
      </div>
      <div className='flex flex-col gap-1 px-4 py-2'>
        <h3 className='h-16 text-lg font-bold'>{jobPosting?.title ?? '제목 없음'}</h3>
        <span className='text-sm text-gray-500'>{jobPosting?.company ?? '회사명'}</span>
        <span className='text-sm text-gray-500'>
          {getBriefLocation(jobPosting?.location ?? '')}
        </span>
        <span className='text-sm text-gray-500'>마감일: {jobPosting.deadline ?? '상시모집'}</span>
      </div>
    </div>
  );
}
