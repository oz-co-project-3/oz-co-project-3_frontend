'use client';

import ScrollShowSearchBar from '@/components/common/searchbar/ScrollShowSearchbar';
import SearchBarSuspense from '@/components/common/searchbar/Searchbar';
import Link from 'next/link';
import { MdOutlineWorkOutline } from 'react-icons/md';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { VscAccount } from 'react-icons/vsc';
import { FaRegComments } from 'react-icons/fa';
import KeywordRecommand from '@/components/common/searchbar/KeywordRecommand';

export default function Home() {
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
              <KeywordRecommand />
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
            <Link href='/community'>
              <div className='flex h-[120px] w-[120px] flex-col gap-5 rounded-md border bg-white p-3 text-center shadow-md hover:bg-gray-100'>
                <FaRegComments className='text-[#FFBA0D]' />
                <span className='text-xl'>커뮤니티</span>
              </div>
            </Link>
          </nav>

          <h1 className='text-2xl font-bold'>최근에 등록된 공고</h1>
          {/* 로그인되면 추천 공고 뜨게 해야함 */}
          <div>추천공고 컴포넌트 뜨게 하기</div>
          <p className='h-[1000px]'>문자열을 크게 해서 한번 스클롤을 내려보겠ㅅ브니다</p>
        </main>
      </div>
    </>
  );
}
