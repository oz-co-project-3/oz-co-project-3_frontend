'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { logoutUser } from '@/api/user';
import MobileBottomHeader from './MobileBottomHeader';
import MobileTopBar from './MobileTopBar';

const userNavItems = [
  { name: '공공 공고', href: '/public-jobs?page=1' },
  { name: '일반 공고', href: '/private-jobs' },
];

// 관리자용
const adminNavItems = [
  { name: '회원 관리', href: '/admin/user' },
  { name: '공고 관리', href: '/admin/jobs' },
  { name: '챗봇 관리', href: '/admin/chatbot' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    try {
      logout(); // Zustand 상태 초기화
      await logoutUser();
      router.push('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  // user_type 배열로 처리
  const userTypes = user?.user_type?.split(',') || [];
  const isAdmin = userTypes.includes('admin'); // admin 포함 여부 확인

  // 관리자인 경우 '/admin/user' 페이지로
  // useEffect(() => {
  //   if (isAdmin && pathname === '/admin') {
  //     // 만약 /admin으로만 접근한 경우에만 /admin/user로 리디렉션
  //     router.push('/admin/user');
  //   }
  // }, [isAdmin, pathname, router]);

  // 로그인 시 adminNavItems로 변경
  const navItems = isAdmin ? adminNavItems : userNavItems;

  // 클라이언트에서 렌더링 완료 후 보여주기
  if (!mounted) return null;

  return (
    <>
      <header className='fixed top-0 right-0 left-0 z-1000 flex items-center justify-between bg-white px-2 shadow shadow-zinc-100 max-sm:hidden'>
        <h1 className='h-[70px] w-[150px]'>
          <Link href='/' className='relative block h-full w-full'>
            <Image
              src='/logo/logo.gif'
              alt='시니어내일'
              fill
              sizes='150px'
              priority={true}
              draggable={false}
              className='object-cover'
            />
          </Link>
        </h1>

        <nav className='grow px-4 lg:px-10'>
          <ul className='flex items-center gap-1'>
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${pathname.includes(item.href.slice(0, 10)) ? 'text-main-light font-bold' : ''} hover:bg-background-ivory rounded-md px-2 py-2 text-lg lg:px-4`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex items-center gap-2'>
          {user ? (
            <>
              <Link href='/dashboard/job-seeker/profile'>
                <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                  대시보드
                </Button>
              </Link>
              <Link href='/'>
                <Button
                  variant='outline'
                  onClick={handleLogout}
                  className='bg-danger cursor-pointer text-white hover:bg-amber-700 hover:text-white'
                >
                  로그아웃
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link href='/user/login'>
                <Button className='bg-main hover:bg-main-light cursor-pointer text-white'>
                  로그인
                </Button>
              </Link>
              <Link href='/user/register'>
                <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                  회원가입
                </Button>
              </Link>
            </>
          )}
        </div>
      </header>

      <MobileTopBar />
      <MobileBottomHeader />
    </>
  );
}
