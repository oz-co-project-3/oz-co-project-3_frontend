import DeleteAccountFlow from '@/app/(auth)/user/deleteAccount/deleteAccount';
import SeekerProfile from '@/components/profile/SeekerProfile';
import Link from 'next/link';

export default async function ProfilePage() {
  return (
    <>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <div className='flex items-center justify-between border-b pb-2'>
          <h2 className='text-2xl font-bold'>프로필</h2>
          <Link
            href='/user/edit'
            className='bg-main-light hover:bg-main-dark cursor-pointer rounded-md px-5 py-1.5 text-white'
          >
            회원정보 수정
          </Link>
        </div>

        <SeekerProfile />

        <div className='z-10 flex min-w-32 gap-2 py-4 max-lg:flex-col max-lg:pt-2'>
          <Link
            href='/user/edit'
            className='bg-main-light hover:bg-main-dark grow cursor-pointer rounded-md px-5 py-1.5 text-center text-white'
          >
            회원정보 수정
          </Link>
          <DeleteAccountFlow />
        </div>
      </section>
    </>
  );
}

// 프사 안하는지 물어보기
