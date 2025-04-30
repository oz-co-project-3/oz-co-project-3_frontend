export default async function SeekerProfile({ id }: { id?: Promise<string> }) {
  const userId = await id;
  console.log('개인유저 id: ', userId);

  // id가 있으면 어드민의 조회, undefined면 유저의 조회

  return (
    <>
      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>이름</span>
          <span>김오즈</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>이메일</span>
          <span>oz-8-frontend@nextrunners.com</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>전화번호</span>
          <span>010-0000-0000</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>생년월일</span>
          <span>1960-01-01</span>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>관심 분야</span>
          <span>프론트엔드, 백엔드, 데이터 분석가</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>지원한 공고 수</span>
          <span>10</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>찜한 공고 수</span>
          <span>10</span>
        </div>
      </div>

      <div className='flex flex-col gap-4 rounded-md border p-8'>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>구직 상태</span>
          <span>구직 중</span>
        </div>
        <div className='flex justify-between border-b pb-4'>
          <span className='font-bold'>가입일</span>
          <span>2025-01-01</span>
        </div>
      </div>
    </>
  );
}
