import DeleteAccountFlow from '@/app/(auth)/user/deleteAccount/deleteAccount';
import SeekerProfile from '@/components/profile/SeekerProfile';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const cookieStore = await cookies();

  // TODO: 로그인 가드 문제점 임시 방편 (리팩토링시 제거)
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  if (!accessToken || !refreshToken) {
    redirect('/user/login');
  }

  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-2 text-2xl font-bold'>프로필</h2>

        <SeekerProfile />

        <div className='z-10 flex min-w-32 gap-2 py-4 max-lg:flex-col max-lg:pt-2'>
          <DeleteAccountFlow />
          <Link
            href='/dashboard/job-seeker/profile/edit'
            className='bg-main-light hover:bg-main-dark grow cursor-pointer rounded-md py-1.5 text-center text-white'
          >
            회원정보 수정
          </Link>
        </div>
      </section>
    </>
  );
}
