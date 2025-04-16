import { JobPosting } from '@/types/jobPosting';
import LikeButton from '../likebutton/LikeButton';

export default function JobPostingItem({
  title,
  location,
  employment_type,
  company_name,
  deadline,
  summary,
}: JobPosting) {
  return (
    <div className='flex flex-row justify-between border-b-2 bg-white py-2 hover:shadow-lg'>
      {/* 근무지 */}
      <div className='flex h-[80px] w-[150px] flex-col items-center justify-center'>
        <span>{location}</span>
      </div>
      {/* 모집제목/기업명 */}
      <div className='flex h-[80px] w-[400px] flex-col justify-center'>
        <span className='text-xl font-black'>{title}</span>
        <span>{company_name}</span>
      </div>
      {/* 근무요약 */}
      <div className='flex h-[80px] w-[300px] flex-col justify-center'>
        <span>{summary}</span>
      </div>
      {/* 근무형태 */}
      <div className='flex h-[80px] w-[200px] flex-col justify-center'>
        <span className='w-15 rounded-sm bg-gray-200 text-center'>{employment_type}</span>
      </div>
      {/* 마감일 */}
      <div className='flex h-[80px] w-[150px] flex-col items-center justify-center'>
        <span>{deadline}</span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <span>
          <LikeButton />
        </span>
      </div>
    </div>
  );
}
