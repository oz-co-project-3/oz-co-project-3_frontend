'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BsSearchHeart } from 'react-icons/bs';
import { useSearchNavigation } from '@/hooks/useSearchNavigation';

function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const { navigateWithSearch } = useSearchNavigation();

  const searchKeyword = searchParams.get('search_keyword');

  useEffect(() => {
    setSearch(searchKeyword || '');
  }, [searchKeyword]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색어가 없거나 기존 검색어와 같으면 이동하지 않음
  const onSubmit = () => {
    if (!search || searchKeyword === search) return;
    navigateWithSearch(search);
  };

  // 엔터키로 검색
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='flex h-10 w-full items-center justify-center'>
      <div className='flex h-10 w-[500px] rounded-3xl border bg-white px-3'>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          className='ml-5 h-full flex-1 bg-transparent outline-none'
          placeholder='검색어를 입력해주세요'
        />
        <button onClick={onSubmit} className='hover:text-main-dark ml-5 text-xl text-[#0F8C3B]'>
          <BsSearchHeart />
        </button>
      </div>
    </div>
  );
}

export default function SearchBarSuspense() {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SearchBar />
    </Suspense>
  );
}
