import fetchOnServer from '@/api/serverFetcher';
import { UserProfileResponse } from '@/types/user';
import { formatDate } from 'date-fns';
import Image from 'next/image';

export default async function SeekerProfile({ id }: { id?: string }) {
  const userId = id;
  console.log('개인유저 id: ', userId);

  let user: UserProfileResponse;

  // id가 있으면 어드민의 특정 유저 조회, undefined면 유저의 본인 조회
  if (userId) {
    user = await fetchOnServer<UserProfileResponse>(`/api/admin/user/${userId}`);
    console.log(user);
  } else {
    user = await fetchOnServer<UserProfileResponse>('/api/user/profile/');
    console.log(user);
  }

  return (
    <>
      <div className='flex flex-col items-center gap-4 rounded-md border p-8'>
        <div className='relative h-48 w-48 overflow-hidden rounded-full border md:h-60 md:w-60 lg:h-80 lg:w-80'>
          <Image
            src={user.seeker?.profile_url ?? '/defaultProfile.png'}
            alt='profile'
            fill
            unoptimized
            className='object-cover'
          />
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>ID</span>
          <span>{user.base.email}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>이름</span>
          <span>{user.seeker?.name ?? '미등록'}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>성별</span>
          <span>{user.base.gender ?? '미등록'}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>전화번호</span>
          <span>{user.seeker?.phone_number ?? '미등록'}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>생년월일</span>
          <span>{user.seeker?.birth ?? '미등록'}</span>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>관심 분야</span>
          <span>{user.seeker?.interests ?? '미등록'}</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>지원한 공고 수</span>
          <span>{user.seeker?.applied_posting_count ?? '0'}</span>
        </div>
        {/* 만들어달라 해야하나? */}
        {/* <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>찜한 공고 수</span>
          <span>10</span>
          </div> */}
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>구직 상태</span>
          <span>{user.seeker?.status ?? '미등록'}</span>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>가입일</span>
          <span>{formatDate(user.base.created_at, 'yyyy-MM-dd')}</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>계정 종류</span>
          <span>{user.base.signinMethod}</span>
        </div>
      </div>
    </>
  );
}
