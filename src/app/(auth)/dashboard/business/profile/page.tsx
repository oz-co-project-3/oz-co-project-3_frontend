// 배포 환경 테스트용
// 정적 프리렌더링 방지 (disableStaticRendering)
export const dynamic = 'force-dynamic';

import CompanyProfile from '@/components/profile/CompanyProfile';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PublicJobsResponse } from '@/types/publicJob';

export default async function CompanyProfilePage() {
  // 배포 환경 테스트용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/public-jobs?offset=20&limit=20`,
  );
  const publicJobs: PublicJobsResponse = await response.json();
  console.log('publicJobs: ', publicJobs);

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex justify-between border-b pb-2'>
          <h2 className='text-2xl font-bold'>기업 프로필</h2>
          {/* 컴포넌트 분리 (클라이언트 컴포넌트) */}
          <div className='flex gap-2'>
            <Button className='bg-danger cursor-pointer hover:bg-amber-700'>회원 탈퇴</Button>
            <Link
              href='/company-dashboard/profile/edit'
              className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
            >
              회사 정보 수정
            </Link>
          </div>
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
