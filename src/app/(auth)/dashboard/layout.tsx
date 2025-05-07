'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const seekerNavItems = [
  { name: '프로필', href: '/dashboard/job-seeker/profile' },
  { name: '이력서', href: '/dashboard/job-seeker/resume' },
  { name: '지원한 채용공고', href: '/dashboard/job-seeker/job-postings/applied' },
  { name: '찜한 채용공고', href: '/dashboard/job-seeker/job-postings/favorite' },
] as const;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const router = useRouter();

  // console.log(user);
  // console.log('business: ', user?.user_type.includes('business'));

  return (
    <main className='flex h-full w-full flex-col overflow-y-auto'>
      <div className='flex w-full flex-1'>
        <div className='mx-auto flex w-full max-w-[1200px] gap-4 py-6'>
          <nav className='rounded bg-white px-4 py-8 sm:w-40 md:w-60'>
            <ul className='flex flex-col gap-4'>
              {seekerNavItems.map((item) => (
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

            {/* 기업 회원 업그레이드 버튼 */}
            {/* 임시 주소로 보냄 (기업회원 업그레이드 페이지 미구현) */}
            {!user?.user_type.includes('business') && (
              <Button
                onClick={() => router.push('/user/register-company')}
                className='bg-main-light hover:bg-main-dark cursor-pointer text-white'
              >
                기업 회원 업그레이드
              </Button>
            )}
          </nav>
          <div className='flex flex-1 flex-col gap-4'>{children}</div>
        </div>
      </div>
    </main>
  );
}