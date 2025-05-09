import fetchOnServer from '@/api/serverFetcher';
import ConfirmButton from '@/components/common/ConfirmButton';
import Resume from '@/components/resume/Resume';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);

  const deleteResume = async () => {
    'use server';

    // TODO: 에러 처리 (try, catch)
    const response = await fetchOnServer(`/api/resume/${id}/`, {
      method: 'DELETE',
    });
    console.log(response);
    redirect('/dashboard/job-seeker/resume');
  };

  return (
    <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
      <h2 className='border-b pb-4 text-2xl font-bold'>이력서 조회 (몇번째 칸인지 써주기?)</h2>
      <Resume id={id} />

      <div className='z-10 flex min-w-32 gap-2 py-4 max-lg:flex-col max-lg:pt-2'>
        <Link
          href={`/dashboard/job-seeker/resume/${id}/edit`}
          className='bg-main-light hover:bg-main-dark flex grow cursor-pointer items-center justify-center rounded-md p-2 text-white'
        >
          수정
        </Link>
        <ConfirmButton
          handleAction={deleteResume}
          title='삭제'
          contentText='삭제한 이력서는 복구할 수 없습니다.'
          actionType='warning'
        />
      </div>
    </section>
  );
}
