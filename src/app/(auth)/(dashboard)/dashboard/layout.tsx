'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { stringToArray } from '@/lib/stringArrayConverter';

const navItems = [
  { name: '프로필', href: '/dashboard/profile' },
  { name: '이력서', href: '/dashboard/resume' },
  { name: '지원한 채용공고', href: '/dashboard/job-postings/applied' },
  { name: '찜한 채용공고', href: '/dashboard/job-postings/favorite' },
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const userTypeList = stringToArray(user?.user_type);
  const showCompanyAuthButton = userTypeList.length === 1 && userTypeList.includes('normal');

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] gap-4 py-6'>
          <nav className='rounded bg-white px-4 py-8 sm:w-40 md:w-60'>
            <ul className='flex flex-col gap-4'>
              {navItems.map((item) => (
                <li key={item.name} className='w-full'>
                  <Link
                    href={item.href}
                    className={`${pathname === item.href ? 'text-main-light font-bold' : ''} hover:bg-background-ivory block w-full rounded-md px-4 py-4 text-xl`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            {/* 기업회원 인증 버튼 추가 - 위치 거슬리지만 나중에 수정하겠슴당(수정)*/}
            {showCompanyAuthButton && (
              <div className='pt-12'>
                <Link href='/user/register-company'>
                  <button className='bg-main-light hover:bg-main-dark w-full rounded-md py-3 text-white'>
                    기업회원 인증
                  </button>
                </Link>
              </div>
            )}
          </nav>
          <div className='flex flex-1 flex-col gap-4'>{children}</div>
        </div>
      </div>
    </main>
  );
}
