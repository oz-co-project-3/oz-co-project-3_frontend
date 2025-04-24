import Link from 'next/link';
import DeleteResumeButton from './DeleteResumeButton';

export default async function ResumeCard({ id }: { id: string }) {
  return (
    <article className='relative flex flex-col gap-2 rounded-md border lg:flex-row'>
      <Link href={`/resume/${id}`} className='absolute inset-0 grow p-4'>
        <span className='sr-only'>이력서 상세보기</span>
      </Link>

      <div className='flex grow flex-col gap-4 p-4'>
        <h3 className='text-lg font-bold'>이력서 제목 (id: {id})</h3>
        <p>메모 내용 (알바지원용 등)</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quo ipsam, fugiat dolores
          iste, totam nemo harum mollitia tempore, consectetur provident excepturi eveniet delectus
          eum odio voluptatem temporibus ratione.
        </p>
        <p className='text-sm text-gray-500'>최종 수정일</p>
      </div>

      <div className='z-10 flex min-w-32 gap-2 p-4 max-lg:pt-2 lg:flex-col'>
        <Link
          href={`/resume/${id}/edit`}
          className='bg-main-light hover:bg-main-dark flex grow cursor-pointer items-center justify-center rounded-md p-2 text-white'
        >
          수정
        </Link>
        <DeleteResumeButton id={id} />
      </div>
    </article>
  );
}
