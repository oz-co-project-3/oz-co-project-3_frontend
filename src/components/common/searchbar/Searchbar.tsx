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
    <div className='ml-30 flex h-10 w-full items-center justify-center'>
      <div className='flex h-10 w-[500px] rounded-sm border bg-white px-3'>
        <input
          value={search}
          onChange={handleChange}
          className='ml-5 h-full flex-1 bg-transparent outline-none'
          placeholder='검색어를 입력해주세요'
        />
        <button className='hover:text-main-dark ml-5 text-xl text-[#0F8C3B]'>
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
