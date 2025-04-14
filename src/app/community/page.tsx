import { Button } from '@/components/ui/button';

export default async function CommunityPage() {
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='relative w-full max-w-[1400px] flex-row justify-between'>
        <div className='flex items-center justify-center'>
          <h1 className='absolute left-1/2 flex-grow -translate-x-1/2 transform text-center text-3xl font-bold'>
            정보공유
          </h1>
          <Button className='ml-auto rounded px-4 py-2 text-white'>글작성</Button>
        </div>
        <hr />
        <p className='text-center text-sm text-gray-700'>
          경험과 가치를 이어가는 새로운 일자리 매칭 <br />
          지금 바로 시작하세요!
        </p>
        <header className='flex flex-row justify-evenly border-b-2 bg-gray-300 py-2'>
          <p>제목</p>
          <p>작성자</p>
          <p>작성일</p>
          <p>조회수</p>
          <p>좋아요</p>
        </header>
      </main>
    </div>
  );
}
