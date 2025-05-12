import DeleteResumeButton from '@/components/admin/resume/DeleteResumeButton';
import fetchOnServer from '@/api/serverFetcher';
import { ResumeResponse } from '@/types/Schema/resumeSchema';
import Resume from '@/components/resume/Resume';
import AdminLayout from '@/components/common/layout/AdminLayout';
import { X } from 'lucide-react';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      throw new Error('이력서가 없습니다.');
    }

    const resume: ResumeResponse = await fetchOnServer(`/api/admin/resume/${id}/`);

    return (
      <AdminLayout>
        <div className='relative'>
          <div className='mt-10'>
            <Link
              href='/admin/user'
              className='absolute top-0 right-0 z-10 rounded-full p-2 text-zinc-400 transition hover:text-zinc-600'
              aria-label='닫기'
            >
              <X className='h-6 w-6' />
            </Link>
          </div>

          <Resume resume={resume} />

          <div className='mb-4 flex justify-end'>
            <DeleteResumeButton id={id} />
          </div>
        </div>
      </AdminLayout>
    );
  } catch (error) {
    return (
      <AdminLayout>
        <div className='p-10 text-center text-red-600'>
          <h2 className='mb-2 text-xl font-bold'>이력서를 불러오는 데 실패했습니다.</h2>
          <p className='text-sm'>{(error as Error).message}</p>
        </div>
      </AdminLayout>
    );
  }
}
