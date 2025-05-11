import { formatPublicJobDate } from '@/lib/utils';
import { PublicJobPosting } from '@/types/publicJob';
import {
  BookCheck,
  Briefcase,
  FileStack,
  FolderOpen,
  GraduationCap,
  Info,
  MapPin,
  PencilLine,
} from 'lucide-react';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public-jobs?id=${id}`);
  const publicJob: PublicJobPosting = (await response.json()).data;
  console.log('publicJob: ', publicJob);

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] flex-col gap-4 rounded-md bg-white p-12'>
          <h2 className='border-b-2 pb-4 text-2xl font-bold'>{publicJob.title}</h2>

          <div className='flex flex-col items-center justify-between gap-4 rounded-md border px-12 py-6 lg:flex-row'>
            <span className='text-xl font-bold text-zinc-800'>{publicJob.company}</span>

            <div className='flex justify-between gap-4 max-lg:w-full lg:flex-col lg:items-end'>
              <span>
                <span className='py-1 font-bold'>게시일: </span>
                {formatPublicJobDate(publicJob.postedAt)}
              </span>
              <span>
                <span className='py-1 font-bold'>마감일: </span>
                {formatPublicJobDate(publicJob.deadline)}
              </span>
            </div>
          </div>

          {/* 모집 조건 */}
          <div className='flex min-w-[300px] grow flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
            <h3 className='text-main-light text-lg font-extrabold'>모집 조건</h3>

            <div className='flex flex-col gap-4'>
              <div className='flex flex-col justify-between gap-4'>
                <h3 className='flex items-center gap-4 text-lg font-bold'>
                  <Briefcase className='size-4' />
                  <span>분야</span>
                </h3>
                <div className='flex flex-wrap gap-2 pl-8 text-zinc-800'>
                  {publicJob.job?.split(',').map((job) => (
                    <span key={job} className='rounded-md bg-zinc-100 px-2 py-1'>
                      {job.replaceAll('.', ', ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex flex-col justify-between gap-4'>
                <h3 className='flex items-center gap-4 text-lg font-bold'>
                  <FolderOpen className='size-4' />
                  <span>모집 형태</span>
                </h3>
                <div className='flex flex-wrap gap-2 pl-8 text-zinc-800'>
                  {publicJob.employmentType?.split(',').map((employmentType) => (
                    <span key={employmentType} className='rounded-md bg-zinc-100 px-2 py-1'>
                      {employmentType.replaceAll('.', ', ')}
                    </span>
                  ))}
                </div>
              </div>

              <div className='flex flex-col justify-between gap-4'>
                <h3 className='flex items-center gap-4 text-lg font-bold'>
                  <PencilLine className='size-4' />
                  <span>직급</span>
                </h3>
                <span className='pl-8 text-zinc-800'>{publicJob.position}</span>
              </div>

              <div className='flex flex-col justify-between gap-4'>
                <h3 className='flex items-center gap-4 text-lg font-bold'>
                  <MapPin className='size-4' />
                  <span>근무지 정보</span>
                </h3>
                <div className='flex flex-wrap gap-2 pl-8 text-zinc-800'>
                  {publicJob.location?.split(',').map((location) => (
                    <span key={location} className='rounded-md bg-zinc-100 px-2 py-1'>
                      {location}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 자격 요건 */}
          <div className='flex min-w-[300px] grow flex-col gap-6 rounded-md border p-4 sm:p-8 md:p-12'>
            <h3 className='flex items-center gap-4 text-lg font-extrabold'>
              <BookCheck className='size-4' />
              <span className='text-main-light whitespace-pre-wrap'>자격 요건</span>
            </h3>
            <pre className='leading-loose whitespace-pre-wrap text-zinc-800'>
              {publicJob.qualification}
            </pre>
            <pre className='leading-loose whitespace-pre-wrap text-zinc-800'>
              {publicJob.disqualification}
            </pre>
            <div className='flex flex-col gap-4 pt-8'>
              <h3 className='flex items-center gap-4 text-lg font-extrabold'>
                <GraduationCap className='size-4' />
                <span className='text-main-light'>학력 요건</span>
              </h3>
              <pre className='whitespace-pre-wrap text-zinc-800'>{publicJob.education}</pre>
            </div>
          </div>

          {/* 우대 사항 */}
          <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
            <h3 className='flex items-center gap-4 text-lg font-extrabold'>
              <Info className='size-4' />
              <span className='text-main-light'>우대 사항</span>
            </h3>
            <pre className='text-lg leading-loose whitespace-pre-wrap text-zinc-800'>
              {publicJob.preferenceDetail}
            </pre>
          </div>

          {/* 채용 절차 */}
          <div className='flex flex-col gap-3 rounded-md border p-4 sm:p-8 md:p-12'>
            <h3 className='flex items-center gap-4 text-lg font-extrabold'>
              <FileStack className='size-4' />
              <span className='text-main-light'>채용 절차</span>
            </h3>
            <pre className='leading-loose whitespace-pre-wrap text-zinc-800'>
              {publicJob.hiringProcess}
            </pre>
          </div>

          {publicJob.url && (
            <Link
              href={publicJob.url}
              target='_blank'
              className='bg-main-light hover:bg-main-dark rounded-md px-4 py-2 text-center text-white transition-all duration-200'
            >
              공고 페이지로 이동
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
