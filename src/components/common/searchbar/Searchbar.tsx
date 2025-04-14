'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const [search, setsearch] = useState('');

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(``); //이동하는 쿼리 나오면 추가하기 Ex./search?q=${search}
  };

  return (
    <div className='flex h-10 w-full items-center justify-center'>
      <input value={search} onChange={onChangeSearch} className='h-10 w-100 rounded-3xl border' />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
