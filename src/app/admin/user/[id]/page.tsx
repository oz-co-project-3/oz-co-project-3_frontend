import SeekerProfile from '@/components/profile/SeekerProfile';

interface Props {
  params: {
    id: string;
  };
}

export default async function AdminUserProfilePage({ params }: Props) {
  const userId = params.id;

  // id로 목데이터 가정.. (지금은 이 값은 넘기기만 하고 내부에서 콘솔 확인 가능)
  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <h2 className='border-b pb-2 text-2xl font-bold'>회원 프로필</h2>
      <SeekerProfile id={Promise.resolve(userId)} /> {/* 목데이터용 id 전달 */}
    </section>
  );
}

// 기존 SeekerProfile 컴포넌트가 async 사용 불가하므로, 여기서는 클라이언트에서 fetch해야 함
// 목데이터라 그냥 SSR로 사용 (API 연동하면 클라이언트 컴포넌트로 분리 필요..!)
// 후에 API 연동 시에는 SeekerProfile을 'use client'로 바꾸고 내부에서 useEffect 등을 써서 fetch?
// 그때는 이 page.tsx는 그대로 SSR로 둬도 되고, 필요한 경우 useRouter() 등 클라이언트 훅을 쓰기 위해 클라이언트 컴포넌트로 옮겨도 됨
