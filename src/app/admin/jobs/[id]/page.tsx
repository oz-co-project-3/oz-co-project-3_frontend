import JobPostingAdmin from '@/components/admin/jobs/JobPostingAdmin';
import AdminLayout from '@/components/common/layout/AdminLayout';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  console.log(id);

  try {
    if (!id) throw new Error('공고 ID가 유효하지 않습니다.');

    return (
      <AdminLayout>
        <JobPostingAdmin id={id} />
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
