import AdminLayout from '@/components/layout/AdminLayout';
import SeekerProfile from '@/components/profile/SeekerProfile';

interface Props {
  params: Promise<{ id: string }>; // 'params'를 Promise로 정의
}

export default async function AdminUserProfilePage(props: Props) {
  const { id } = await props.params; // 'params'를 await해서 'id' 추출

  return (
    <AdminLayout>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-2 text-2xl font-bold'>회원 프로필</h2>
        <SeekerProfile id={Promise.resolve(id)} /> {/* 'id'를 Promise로 전달 */}
      </section>
    </AdminLayout>
  );
}

// (API 연동하면 클라이언트 컴포넌트로 분리 필요..!)
