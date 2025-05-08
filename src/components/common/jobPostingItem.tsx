import LikeButton from '@/components/common/likebutton/LikeButton';
import Link from 'next/link';
import { JobPostingResponse } from '@/types/Schema/jobPostingSchema';
import { truncate } from '@/lib/utils';

type JobPostingItemProps = {
  post: JobPostingResponse;
  detailPagePath: string;
};

export default function JobPostingItem({ post, detailPagePath }: JobPostingItemProps) {
  //여기 타입 변경하기
  return (
    <div>
      <Link href={`${detailPagePath}/${post.id}`}>
        <div className='flex flex-row justify-between border-b-2 bg-white py-2 hover:shadow-lg'>
          {/* 근무지 */}
          <div className='flex h-[80px] w-[150px] flex-col items-center justify-center'>
            <span>{post.location}</span>
          </div>
          {/* 모집제목/기업명 */}
          <div className='flex h-[80px] w-[400px] flex-col justify-center'>
            <span className='tegitxt-xl font-black'>{post.title}</span>
            <span>{truncate(post.company, 100)}</span>
          </div>
          {/* 근무요약 */}
          <div className='flex h-[80px] w-[300px] flex-col justify-center'>
            <span>
              {post.summary
                ? post.summary.length > 100
                  ? post.summary.slice(0, 100) + '...'
                  : post.summary
                : ''}
            </span>
          </div>
          {/* 근무형태 */}
          <div className='flex h-[80px] w-[200px] flex-col justify-center'>
            <span className='w-15 rounded-sm bg-gray-200 text-center'>{post.employment_type}</span>
          </div>
          {/* 마감일 */}
          <div className='flex h-[80px] w-[150px] flex-col items-center justify-center'>
            <span>{post.deadline}</span>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <span className='top-8 right-2'>
              <LikeButton id={post.id} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
