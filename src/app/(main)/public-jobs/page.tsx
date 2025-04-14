import { Button } from '@/components/ui/button';

export default async function PublicJobsPage() {
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>공공일자리 정보</h1>
        <hr />
        <h2 className='text-2xl font-bold'>맞춤 조건을 클릭하세요</h2>
        <div className='mb-10 flex space-x-2'>
          <Button>거리순</Button>
          <Button>인기순</Button>
          <Button>최신순</Button>
          <Button>관심분야</Button>
        </div>
        <div>
          <h2 className='text-2xl font-bold'>채용정보</h2>
          <div>필터링된 정보 컴포넌트</div>
        </div>
      </main>
    </div>
  );
}
