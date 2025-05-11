import { formatPublicJobDate } from '@/lib/utils';
import { PublicJobPosting } from '@/types/publicJob';
import Link from 'next/link';

export default async function PublicJobPostingCard({
  publicJobPosting,
}: {
  publicJobPosting: PublicJobPosting;
}) {
  return (
    <li className='relative flex flex-col gap-4 rounded-md border px-8 py-6 transition-all duration-200 hover:bg-zinc-100 sm:justify-between'>
      <Link href={`/public-jobs/${publicJobPosting.id}`} className='absolute inset-0 grow'>
        <span className='sr-only'>공고 링크</span>
      </Link>

      <div className='flex flex-col gap-4 lg:flex-row lg:justify-between'>
        <div className='flex flex-col gap-4'>
          <h3 className='bg-main-light rounded px-2 py-1 text-lg font-bold text-white'>
            {publicJobPosting.title}
          </h3>
          <span className='w-fit border-b px-2 pb-1 font-bold'>{publicJobPosting.company}</span>
        </div>

        <div className='flex flex-col gap-4 lg:items-end'>
          <span>{publicJobPosting.position?.replaceAll('+', ', ')}</span>
          <span>{publicJobPosting.employmentType?.replaceAll(',', ', ')}</span>
        </div>
      </div>

      <div className='flex flex-wrap gap-2'>
        <span className='py-1 font-bold'>지역: </span>
        {publicJobPosting.location?.split(',').map((location) => (
          <span key={location} className='rounded-md bg-zinc-100 px-2 py-1'>
            {location}
          </span>
        ))}
      </div>
      <div className='flex flex-wrap gap-2'>
        <span className='py-1 font-bold'>분야: </span>
        {publicJobPosting.job?.split(',').map((job) => (
          <span key={job} className='rounded-md bg-zinc-100 px-2 py-1'>
            {job.replaceAll('.', ', ')}
          </span>
        ))}
      </div>

      <div className='flex justify-between gap-4'>
        <span>
          <span className='py-1 font-bold'>마감일: </span>
          {formatPublicJobDate(publicJobPosting.deadline)}
        </span>
        <span>
          <span className='py-1 font-bold'>게시일: </span>
          {formatPublicJobDate(publicJobPosting.postedAt)}
        </span>
      </div>

      {/* 목록 조회용 카드에선 불필요 */}
      {/* <p>{publicJobPosting.education}</p> */}
      {/* <p>{publicJobPosting.qualification}</p> */}
      {/* <p>{publicJobPosting.disqualification}</p> */}
      {/* <p>{publicJobPosting.preference}</p> */}
      {/* <p>{publicJobPosting.preferenceDetail}</p> */}
      {/* <p>{publicJobPosting.hiringProcess}</p> */}
    </li>
  );
}
