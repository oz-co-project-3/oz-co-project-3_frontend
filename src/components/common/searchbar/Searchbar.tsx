'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { BsSearchHeart } from 'react-icons/bs';
import { useSearchNavigation } from '@/hooks/useSearchNavigation';
import { useDebouncedCallback } from 'use-debounce';

function SearchBar() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const { navigateWithSearch } = useSearchNavigation();

  const searchKeyword = searchParams.get('search_keyword');

  useEffect(() => {
    setSearch(searchKeyword || '');
  }, [searchKeyword]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    if (searchKeyword !== value) {
      navigateWithSearch(value);
    }
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <div className='m-auto flex h-14 w-[350px] rounded-3xl border bg-white px-3 sm:w-[500px] md:w-[600px] lg:w-[750px]'>
      <input
        value={search}
        onChange={handleChange}
        className='ml-5 h-full flex-1 bg-transparent text-lg outline-none'
        placeholder='검색어를 입력해주세요'
      />
      <button className='hover:text-main-dark ml-5 text-xl text-[#0F8C3B]'>
        <BsSearchHeart />
      </button>
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
