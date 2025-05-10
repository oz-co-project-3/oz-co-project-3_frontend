import AdminLayout from '@/components/layout/AdminLayout';
import fetchOnServer from '@/api/serverFetcher';
import { UserProfileResponse } from '@/types/user';
import SeekerProfile from '@/components/profile/SeekerProfile';
import CompanyProfile from '@/components/profile/CompanyProfile';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(typeof id);
  const user: UserProfileResponse = await fetchOnServer(`/api/admin/user/${id}/`);

  return (
    <AdminLayout>
      {user.seeker ? (
        <SeekerProfile id={id} />
      ) : user.corp ? (
        <CompanyProfile id={id} />
      ) : (
        <div className='p-10 text-center text-red-600'>
          <h2 className='mb-2 text-xl font-bold'>아직 프로필이 등록되지 않은 회원입니다.</h2>
          <p className='text-sm'>구직자 또는 기업 회원 등록 후 다시 확인해주세요.</p>
        </div>
      )}
    </AdminLayout>
  );
}
