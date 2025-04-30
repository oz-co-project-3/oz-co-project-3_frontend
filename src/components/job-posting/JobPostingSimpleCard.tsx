import { Bookmark } from 'lucide-react';
import Image from 'next/image';

export default async function JobPostingSimpleCard() {
  return (
    <div className='relative flex w-[31%] cursor-pointer flex-col overflow-hidden rounded-md border transition-all duration-150 hover:scale-105'>
      <div className='relative h-[150px] w-full'>
        <Image
          src={'/images/job-posting-card.png'}
          alt='job-posting-card'
          fill
          className='border-b border-gray-300'
        />
      </div>
      <div className='flex flex-col gap-1 px-4 py-2'>
        <h3 className='text-lg font-bold'>채용공고 제목</h3>
        <span className='text-sm text-gray-500'>기업명</span>
        <span className='text-sm text-gray-500'>위치 / 근무형태</span>
      </div>
      <Bookmark className='absolute right-2 bottom-2' />
    </div>
  );
}
