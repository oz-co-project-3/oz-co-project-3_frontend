import { Button } from '@/components/ui/button';

export default function CreatePostPage() {
  return (
    <div className='flex h-full justify-center pt-30'>
      <main className='w-full max-w-[1400px] flex-row'>
        <h1 className='text-center text-3xl font-bold'>정보공유</h1>
        <hr />
        <div className='flex items-center justify-between pt-5'>
          <h1 className='text-2xl font-bold'>카페 글쓰기</h1>
          <Button>등록</Button>
        </div>
        <hr />
        {/* 여기 작성폼 들어가기 */}
      </main>
    </div>
  );
}
