import ScrollShowSearchBar from '@/components/common/searchbar/ScrollShowSearchbar';
import SearchBarSuspense from '@/components/common/searchbar/Searchbar';
import Link from 'next/link';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
// import { FaRegComments } from 'react-icons/fa';
import KeywordRecommand from '@/components/common/searchbar/KeywordRecommand';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Suspense } from 'react';
import Loading from './(main)/loading';
import RecentPostingsCard from '@/components/job-posting/RecentPostingsCard';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';
import fetchOnServer from '@/api/serverFetcher';
import { UserProfileResponse } from '@/types/user';
import RecommendedJobCard from '@/components/job-posting/RecommendedJobCard';
import { PublicJobsResponse } from '@/types/publicJob';

export default async function Home() {
  //일반
  const jobPosting = await fetchOnServer<JobPostingListResponse>('/api/postings/');
  const privateJobs = jobPosting.data.slice(0, 5);
  console.log('일반', privateJobs);

  //공공
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/public-jobs/`);
  const publicJobs: PublicJobsResponse = await response.json();
  console.log('공공: ', publicJobs);

  const userData = await fetchOnServer<UserProfileResponse>('/api/user/profile/');
  console.log(userData);
  const IsLoggedIn = !!userData.seeker?.name;

  const isSeoulPublic = userData.seeker?.interests.includes('서울시 공공 일자리');

  return (
    <>
      <ScrollShowSearchBar />
      <div className='flex h-full justify-center pt-30'>
        <main className='max-w-[1400px] flex-row text-center'>
          <h1 className='text-3xl font-bold'>&quot;내일 뭐하지? 시니어내일에서 찾아봐요!&quot;</h1>
          <p className='mb-10 text-sm text-gray-700'>
            경험과 가치를 이어가는 새로운 일자리 매칭
            <br />
            지금 바로 시작하세요!
          </p>
          <SearchBarSuspense />
          <div className='mt-1 mb-10 flex flex-row justify-center'>
            <p className='mr-5 text-gray-500'>검색 키워드 추천</p>
            <div className='mb-1 flex justify-center'>
              <Suspense fallback={<Loading />}>
                <KeywordRecommand />
              </Suspense>
            </div>
          </div>
          <nav className='mb-10 flex flex-row justify-center space-x-4'>
            <Link href='/public-jobs'>
              <div className='flex h-[120px] w-[120px] flex-col gap-5 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100'>
                <AiOutlineFileSearch className='text-[#2B90D9]' />
                <span className='text-xl'>공공 공고</span>
              </div>
            </Link>
            <Link href='/private-jobs'>
              <div className='flex h-[120px] w-[120px] flex-col gap-5 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100'>
                <MdOutlineWorkOutline className='text-[#22C55E]' />
                <span className='text-xl'>일반 공고</span>
              </div>
            </Link>
            <Link href='/dashboard'>
              <div className='flex h-[120px] w-[120px] flex-col gap-5 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100'>
                <VscAccount className='text-[#A881AF]' />
                <span className='text-xl'>이력서</span>
              </div>
            </Link>
            {/* <Link href='/community'>
              <div className='flex h-[120px] w-[120px] flex-col gap-5 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100'>
                <FaRegComments className='text-[#FFBA0D]' />
                <span className='text-xl'>커뮤니티</span>
              </div>
            </Link> */}
          </nav>

          {/* 로그인시 보일수 있도록 조건 걸기 */}
          {IsLoggedIn ? (
            <>
              <h1 className='mb-3 text-2xl font-bold'>추천 공고</h1>
              <Carousel opts={{ align: 'center' }} className='mx-auto flex w-full max-w-2xl'>
                <CarouselContent>
                  {isSeoulPublic
                    ? publicJobs.data.map((job) => (
                        <CarouselItem key={job.id} className='md:basis-1/2 lg:basis-1/3'>
                          <RecommendedJobCard
                            jobPosting={job} // 공공공고 타입에 맞게 전달
                            userData={userData}
                          />
                        </CarouselItem>
                      ))
                    : privateJobs.map((job) => (
                        <CarouselItem key={job.id} className='md:basis-1/2 lg:basis-1/3'>
                          <RecommendedJobCard
                            jobPosting={job} // 일반공고 타입에 맞게 전달
                            userData={userData}
                          />
                        </CarouselItem>
                      ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </>
          ) : null}

          <div>
            <h1 className='mb-3 text-2xl font-bold'>최근에 등록된 공고</h1>

            <Carousel
              opts={{
                align: 'center',
              }}
              className='mx-auto flex w-full max-w-2xl'
            >
              <CarouselContent>
                {privateJobs.map((jobPosting) => (
                  <CarouselItem key={jobPosting.id} className='md:basis-1/2 lg:basis-1/3'>
                    <RecentPostingsCard jobPosting={jobPosting} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </main>
      </div>
    </>
  );
}
