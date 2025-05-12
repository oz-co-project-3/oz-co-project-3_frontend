import CompanyProfile from '@/components/profile/CompanyProfile';

import Link from 'next/link';

export default async function CompanyProfilePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-2'>
          <h2 className='text-2xl font-bold'>기업 프로필</h2>
          <Link
            href='/company-dashboard/profile/edit'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            회사 정보 수정
          </Link>
        </div>

        <CompanyProfile />

        <div className='flex w-full gap-2'>
          <Link
            href='/dashboard/business/job-postings/expired'
            className='grow cursor-pointer rounded border py-2 text-center transition-all duration-150 hover:bg-zinc-100'
          >
            지난 채용공고
          </Link>
          <Link
            href='/dashboard/business/job-postings/current'
            className='grow cursor-pointer rounded border py-2 text-center transition-all duration-150 hover:bg-zinc-100'
          >
            현재 채용공고
          </Link>
        </div>

        {/* URL 확인 */}
        <Link
          href='/dashboard/business/job-postings/post'
          className='bg-main-light hover:bg-main-dark cursor-pointer rounded py-2 text-center text-white transition-all duration-150'
        >
          채용 공고 등록
        </Link>
      </section>
    </>
  );
}
