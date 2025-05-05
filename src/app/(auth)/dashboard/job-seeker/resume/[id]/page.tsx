import Resume from '@/components/resume/Resume';
import { Button } from '@/components/ui/button';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <h2 className='border-b pb-4 text-2xl font-bold'>이력서 조회 (몇번째 칸인지 써주기?)</h2>
      <Resume id={id} />
      {/* 컴포넌트 분리 (클라이언트 컴포넌트) */}
      <div className='flex justify-center gap-2'>
        {/* 확인 모달 추가, 삭제 api 요청 */}
        <Button variant='destructive' className='grow cursor-pointer'>
          삭제
        </Button>
        {/* 수정 페이지로 링크 */}
        <Button className='grow cursor-pointer'>수정</Button>
      </div>
    </section>
  );
}
