'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { logoutUser } from '@/api/user';

const userNavItems = [
  { name: '공공 공고', href: '/public-jobs' },
  { name: '일반 공고', href: '/private-jobs' },
  { name: '커뮤니티', href: '/community' },
  { name: 'ADMIN', href: '/admin' }, // 임시
];

// 관리자용
const adminNavItems = [
  { name: '회원 관리', href: '/admin/user' },
  { name: '공고 관리', href: '/admin/jobs' },
  { name: '챗봇 관리', href: '/admin/chatbot' },
  { name: '커뮤니티 관리', href: '/admin/community' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken, login, logout } = useAuthStore();

  // 클라이언트에서 localStorage → Zustand에 반영 (hydration mismatch 방지용)
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      const rawUser = localStorage.getItem('user');
      if (token && rawUser && rawUser !== 'undefined') {
        try {
          const user = JSON.parse(rawUser);
          login(user, token);
        } catch (err) {
          console.error('user JSON 파싱 실패:', err);
        }
      }
      setHasMounted(true);
    }
  }, [login]);

  // hydration mismatch 방지를 위한 mounted 상태
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser(); // access_token이 만료되면 여기서 에러
    } catch (err) {
      console.warn('로그아웃 API 실패 :', err);
    }

    logout(); // 상태 초기화
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const isAdminPage = pathname.startsWith('/admin');
  const navItems = isAdminPage ? adminNavItems : userNavItems;

   //클라이언트에서 렌더링 완료 후 보여주기 (SSR 조건부 렌더링 차이 해결)
   if (!hasMounted) return null;

  return (
    <header className='fixed top-0 right-0 left-0 z-10 flex items-center justify-between border-b bg-white px-2'>
      <h1>
        <Link href='/'>
          <Image
            src='/logo/logo.gif'
            alt='시니어내일'
            width={150}
            height={50}
            priority={true}
            draggable={false}
          />
        </Link>
      </h1>

      <nav className='grow px-12'>
        <ul className='flex items-center gap-4'>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`${pathname === item.href ? 'text-main-light font-bold' : ''}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className='flex items-center gap-2'>
        {/* 수정: 클라이언트 마운트 후에만 accessToken으로 분기 */}
        {!mounted ? null : accessToken ? (
          <>
            <Link href='/dashboard/profile'>
              <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                개인
              </Button>
            </Link>
            <Link href='/company-dashboard/profile'>
              <Button className='bg-main-light hover:bg-main-dark cursor-pointer text-white'>
                기업
              </Button>
            </Link>
            <Button
              variant='outline'
              onClick={handleLogout}
              className='cursor-pointer bg-amber-600 text-white hover:bg-amber-800'
            >
              로그아웃
            </Button>
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
  );
}
