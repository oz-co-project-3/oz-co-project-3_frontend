'use client';
import SearchBarSuspense from '@/components/common/searchbar/Searchbar';
import { useEffect, useState } from 'react';

export default function ScrollShowSearchBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 220;

      if (scrollY > triggerPoint) {
        setShow(true);
      } else {
        setShow(false); // 스크롤을 올리면 다시 숨김
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return show ? (
    <div className='fixed top-16 right-0 left-0 z-10 flex h-14 items-center bg-white'>
      <SearchBarSuspense />
    </div>
  ) : null;
}
