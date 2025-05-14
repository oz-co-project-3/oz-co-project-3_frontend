'use client';

import { BriefcaseBusiness, Landmark, User } from 'lucide-react';
import Link from 'next/link';

export default function MobileBottomHeader() {
  return (
    <header className='bg-background-ivory fixed bottom-0 left-0 z-10 flex h-[80px] w-full items-center justify-center border-t text-sm sm:hidden'>
      <Link
        href='/public-jobs?page=1'
        className='flex h-full w-1/3 flex-col items-center justify-center gap-2'
        draggable={false}
      >
        <Landmark className='size-6' />
        공공
        {/* {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/menu');
          return (
            <>
              <Utensils
                className={`${isActive ? 'active text-[var(--point-orange)]' : ''} size-5`}
              />
              <span>메뉴</span>
            </>
          );
        }} */}
      </Link>

      {/* <Link
        href='/'
        className='flex h-full w-1/3 flex-col items-center justify-center gap-2'
        draggable={false}
      >
        홈
      </Link> */}

      <Link
        href='/private-jobs'
        className='flex h-full w-1/3 flex-col items-center justify-center gap-2'
        draggable={false}
      >
        <BriefcaseBusiness className='size-6' />
        일반
        {/* {({ isActive }) => {
          isActive = isActive || location.pathname.startsWith('/diet');
          return (
            <>
              <NotebookText
                className={`${isActive ? 'active text-[var(--point-orange)]' : ''} size-5`}
              />
              <span>식단</span>
            </>
          );
        }} */}
      </Link>

      <Link
        href='/dashboard/job-seeker/profile'
        className='flex h-full w-1/3 flex-col items-center justify-center gap-2'
        draggable={false}
      >
        <User className='size-6' />
        마이페이지
      </Link>
    </header>
  );
}
