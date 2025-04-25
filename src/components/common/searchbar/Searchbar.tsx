'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { BsSearchHeart } from 'react-icons/bs';

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const pathname = usePathname();

  const q = searchParams.get('q');

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 검색어가 없거나 기존 검색어와 같으면 이동하지 않음
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`${pathname}?search_keyword=${encodeURIComponent(search)}`);
  };

  // 엔터키로 검색
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className='flex h-10 w-full items-center justify-center'>
      <div className='flex h-10 w-[400px] rounded-3xl border bg-white px-3'>
        <input
          value={search}
          onKeyDown={onKeyDown}
          onChange={onChangeSearch}
          className='h-full flex-1 bg-transparent outline-none'
        />
        <button onClick={onSubmit} className='ml-2 text-xl text-[#0F8C3B]'>
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
