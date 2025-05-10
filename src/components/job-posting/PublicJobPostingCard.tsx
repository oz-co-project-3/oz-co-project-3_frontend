import { PublicJobPosting } from '@/types/publicJob';
import Link from 'next/link';

export default async function PublicJobPostingCard({
  publicJobPosting,
}: {
  publicJobPosting: PublicJobPosting;
}) {
  return (
    <li className='relative flex gap-4 rounded-md border px-8 py-6 transition-all duration-200 hover:bg-zinc-100 max-sm:flex-col sm:justify-between'>
      <Link href={publicJobPosting.url ?? ''} target='_blank' className='absolute inset-0 grow'>
        <span className='sr-only'>공고 링크</span>
      </Link>

      <div>
        <h3>{publicJobPosting.title}</h3>
        <p>{publicJobPosting.company}</p>
      </div>
    </li>
  );
}
