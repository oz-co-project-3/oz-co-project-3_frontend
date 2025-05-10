import fetchOnServer from '@/api/serverFetcher';
import { UserProfileResponse } from '@/types/user';
import { formatDate } from 'date-fns';
import Image from 'next/image';

export default async function CompanyProfile({ id }: { id?: Promise<string> }) {
  const userId = await id;
  console.log('기업유저 id: ', userId, ' (회사 프로필 페이지)');

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
        <div className='relative h-40 w-60 overflow-hidden rounded-md border md:h-56 md:w-80 lg:h-68 lg:w-100'>
          <Image
            src={user.corp?.profile_url ?? '/Character2.png'}
            alt='company profile'
            fill
            unoptimized
            className='object-contain'
          />
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>ID</span>
          <span>{user.base.email}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>회사명</span>
          <span>{user.corp?.company_name ?? '미등록'}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>사업자 등록 번호</span>
          <span>{user.corp?.business_number ?? '미등록'}</span>
        </div>
        <div className='flex w-full justify-between border-b pb-4'>
          <span className='font-bold'>회사 개업일</span>
          <span>{formatDate(user.corp?.business_start_date ?? '', 'yyyy-MM-dd') ?? '미등록'}</span>
        </div>
        <div className='flex w-full flex-col gap-2 border-b pb-4'>
          <span className='mb-2 w-fit border-b pr-1 pb-2 font-bold'>회사 소개</span>
          <pre className='whitespace-pre-wrap'>{user.corp?.company_description ?? '미등록'}</pre>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>담당자 이름</span>
          <span>{user.corp?.manager_name ?? '미등록'}</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>담당자 전화번호</span>
          <span>{user.corp?.manager_phone_number ?? '미등록'}</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>담당자 이메일</span>
          <span>{user.corp?.manager_email ?? '미등록'}</span>
        </div>
      </div>
    </>
  );
}
