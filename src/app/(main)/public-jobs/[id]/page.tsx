import { PublicJobPosting } from '@/types/publicJob';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public-jobs?id=${id}`);
  const publicJob: PublicJobPosting = (await response.json()).data;
  console.log('publicJob: ', publicJob);

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] flex-col gap-4 rounded-md bg-white py-8'>
          <h3 className='text-lg font-bold'>{publicJob.title}</h3>
          <p>{publicJob.company}</p>
          <p>{publicJob.location}</p>
          <p>{publicJob.deadline}</p>
          <p>{publicJob.job}</p>
          <p>{publicJob.position}</p>
          <p>{publicJob.employmentType}</p>
          <p>{publicJob.qualification}</p>
          <p>{publicJob.disqualification}</p>
          <p>{publicJob.education}</p>
          <p>{publicJob.preference}</p>
          <p>{publicJob.preferenceDetail}</p>
          <p>{publicJob.hiringProcess}</p>
          <p>{publicJob.postedAt}</p>
          {publicJob.url && (
            <Link href={publicJob.url} target='_blank'>
              공고 링크
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
