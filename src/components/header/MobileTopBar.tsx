'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
// import useSWR from 'swr';
// import { UserProfileResponse } from '@/types/user';
// import { fetchOnClient } from '@/api/clientFetcher';
import { useAuthStore } from '@/store/useAuthStore';
import { businessNavItems, seekerNavItems } from '@/constants/nav';
import { logoutUser } from '@/api/user';

export default function MobileTopBar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // const { data: profile } = useSWR<UserProfileResponse | null>(
  //   user ? '/api/user/profile/' : null,
  //   fetchOnClient,
  // );
  const isBusiness = user?.user_type?.includes('business');

  const handleLogout = async () => {
    try {
      await logoutUser();
      logout(); // Zustand 상태 초기화
      router.push('/');
    } catch (err) {
      console.log('로그아웃 실패:', err);
      logout(); // Zustand 상태 초기화
      router.refresh();
    }
  };

  return (
    <div className='fixed top-0 right-0 left-0 z-1000 flex h-[70px] items-center justify-between border-b bg-white px-4 sm:hidden'>
      <Button
        variant='outline'
        size='icon'
        onClick={() => router.back()}
        className='cursor-pointer'
      >
        <ChevronLeft />
      </Button>

      <h1 className='h-[68px] w-[150px]'>
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

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border'
        >
          <Menu size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className='z-2000 -translate-x-2 translate-y-1 p-4'>
          {/* 로그아웃 상태 */}
          {!user && (
            <>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <Link href='/user/login' className='p-1 text-base'>
                  로그인
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <Link href='/user/register' className='p-1 text-base'>
                  회원가입
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {/* 로그인 상태 */}
          {user &&
            seekerNavItems.map((item) => (
              <DropdownMenuItem
                key={item.name}
                className='cursor-pointer'
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <Link href={item.href} className='p-1 text-base'>
                  {item.name}
                </Link>
              </DropdownMenuItem>
            ))}

          {/* 비즈니스 유저 로그인 상태 */}
          {isBusiness && (
            <>
              <DropdownMenuSeparator />
              {businessNavItems.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  className='cursor-pointer'
                  onClick={() => {
                    setIsDropdownOpen(false);
                  }}
                >
                  <Link href={item.href} className='p-1 text-base'>
                    {item.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}

          {/* 로그인 상태 */}
          {user && !isBusiness ? (
            <>
              <DropdownMenuSeparator />
              <Link href='/user/register-company' className='block px-2 py-3 text-base'>
                기업 회원 업그레이드
              </Link>
            </>
          ) : null}
          {user && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className='p-0'
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
              >
                <Link href='/' className='w-full'>
                  <Button
                    variant='outline'
                    onClick={handleLogout}
                    className='bg-danger mt-3 w-full cursor-pointer text-white hover:bg-amber-700 hover:text-white'
                  >
                    로그아웃
                  </Button>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
