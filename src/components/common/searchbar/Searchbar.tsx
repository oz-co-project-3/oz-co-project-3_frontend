'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BsSearchHeart } from 'react-icons/bs';

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setsearch] = useState('');

  const q = searchParams.get('q');

  useEffect(() => {
    setsearch(q || '');
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  // 검색어가 없거나 기존 검색어와 같으면 이동하지 않음
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(``); //이동하는 쿼리 나오면 추가하기 Ex./search?q=${search}
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
