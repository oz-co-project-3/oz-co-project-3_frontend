'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, Landmark, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function MobileBottomHeader() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <header className='bg-background-ivory fixed bottom-0 left-0 z-100 flex h-[80px] w-full items-center justify-center border-t text-sm sm:hidden'>
      <Link
        href='/public-jobs?page=1'
        className={`flex h-full w-1/3 flex-col items-center justify-center gap-2 ${pathname.includes('/public-jobs') ? 'text-main-light' : ''}`}
        draggable={false}
      >
        <Landmark
          className={`size-6 ${pathname.includes('/public-jobs') ? 'text-main-light' : ''}`}
        />
        공공 채용
      </Link>

      <Link
        href='/private-jobs'
        className={`flex h-full w-1/3 flex-col items-center justify-center gap-2 ${pathname.includes('/private-jobs') ? 'text-main-light' : ''}`}
        draggable={false}
      >
        <BriefcaseBusiness
          className={`size-6 ${pathname.includes('/private-jobs') ? 'text-main-light' : ''}`}
        />
        일반 채용
      </Link>

      <Link
        href='/dashboard'
        className={`flex h-full w-1/3 flex-col items-center justify-center gap-2 ${pathname.includes('/dashboard') ? 'text-main-light' : ''}`}
        draggable={false}
      >
        <User className={`size-6 ${pathname.includes('/dashboard') ? 'text-main-light' : ''}`} />
        {user ? '마이페이지' : '로그인'}
      </Link>
    </header>
  );
}
