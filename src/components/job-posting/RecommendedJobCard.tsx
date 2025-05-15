'use client';

import { getBriefLocation } from '@/lib/utils';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import Image from 'next/image';
import Link from 'next/link';
import LikedButton from '../common/likebutton/LikedButton';
import { PublicJobPosting } from '@/types/publicJob';
// import { UserProfileResponse } from '@/types/user';

interface Props {
  jobPosting: JobPostingResponse;
  // userData: UserProfileResponse;
}

const isPublicJob = (job: JobPostingResponse | PublicJobPosting): job is PublicJobPosting => {
  return 'url' in job;
};

export default function RecommendedJobCard({ jobPosting }: Props) {
  const isPublic = isPublicJob(jobPosting);
  // console.log(userData);
  //추가 필터링 위해 받아놓기

  return (
    <div className='relative flex w-full cursor-pointer flex-col overflow-hidden rounded-md border transition-all duration-150 hover:scale-105'>
      {/* 공고 상세 링크 */}
      <Link
        href={isPublic ? `/public-jobs/${jobPosting.id}` : `/private-jobs/${jobPosting.id}`}
        className='absolute inset-0 z-10 grow'
      >
        <span className='sr-only'>공고 상세보기</span>
      </Link>

      {/* 이미지 영역 */}
      <div className='relative h-[150px] w-full'>
        <Image
          src={
            jobPosting.image_url ? jobPosting.image_url : 'https://picsum.photos/300/200?random=1'
          }
          alt='job-posting-card'
          fill
          draggable={false}
          unoptimized
          className='z-0 border-b border-gray-300 object-cover'
        />
      </div>

      {/* 공고 정보 */}
      <div className='flex flex-col items-start gap-1 px-4 py-2'>
        <h3 className='line-clamp-2 h-16 w-full text-center text-lg font-bold'>
          {jobPosting?.title ?? '제목 없음'}
        </h3>
        <span className='text-sm text-gray-500'>{jobPosting?.company ?? '회사명'}</span>
        <span className='text-sm text-gray-500'>
          {getBriefLocation(jobPosting?.location ?? '')}
        </span>
        <span className='text-sm text-gray-500'>마감일: {jobPosting.deadline ?? '상시모집'}</span>
      </div>

      {/* 좋아요 버튼 */}
      <div className='absolute right-2 bottom-1 z-20 items-end justify-end'>
        {isPublic ? null : (
          <LikedButton
            id={jobPosting.id}
            is_bookmarked={(jobPosting as JobPostingResponse).is_bookmarked}
          />
        )}
      </div>
    </div>
  );
}
