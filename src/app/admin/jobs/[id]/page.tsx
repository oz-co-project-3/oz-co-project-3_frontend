import JobPostingAdmin from '@/components/admin/jobs/JobPostingAdmin';
import AdminLayout from '@/components/common/layout/AdminLayout';
import { X } from 'lucide-react';
import Link from 'next/link';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    if (!id) throw new Error('공고 ID가 유효하지 않습니다.');

    return (
      <AdminLayout>
        <div className='relative'>
          <div className='mb-8'>
          <Link
            href='/admin/jobs'
            className='absolute -top-2 right-0 z-10 rounded-full p-2 text-zinc-400 transition hover:text-zinc-600'
            aria-label='닫기'
          >
            <X className='h-6 w-6' />
          </Link>
          </div>

          <JobPostingAdmin id={id} />
        </div>
      </AdminLayout>
    );
  } catch (error) {
    return (
      <AdminLayout>
        <div className='p-10 text-center text-red-600'>
          <h2 className='mb-2 text-xl font-bold'>공고를 불러오는 데 실패했습니다.</h2>
          <p className='text-sm'>{(error as Error).message}</p>
        </div>
      </AdminLayout>
    );
  }
}
