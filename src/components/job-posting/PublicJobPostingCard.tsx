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

      <h3 className='text-lg font-bold'>{publicJobPosting.title}</h3>
      <p>{publicJobPosting.company}</p>
      <p>{publicJobPosting.location}</p>
      <p>{publicJobPosting.deadline}</p>
      <p>{publicJobPosting.job}</p>
      <p>{publicJobPosting.position}</p>
      <p>{publicJobPosting.employmentType}</p>
      <p>{publicJobPosting.qualification}</p>
      <p>{publicJobPosting.disqualification}</p>
      <p>{publicJobPosting.education}</p>
      <p>{publicJobPosting.preference}</p>
      <p>{publicJobPosting.preferenceDetail}</p>
      <p>{publicJobPosting.hiringProcess}</p>
      <p>{publicJobPosting.postedAt}</p>
    </li>
  );
}
