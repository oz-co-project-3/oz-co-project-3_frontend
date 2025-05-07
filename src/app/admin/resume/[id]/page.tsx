import AdminLayout from '@/components/layout/AdminLayout';
import ResumeAdmin from '@/components/admin/resume/ResumeAdmin';
import DeleteResumeButton from '@/components/admin/resume/DeleteResumeButton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    if (!id) {
      throw new Error('이력서가 없습니다.');
    }

    return (
      <AdminLayout>
        <div className='mb-4 flex justify-end'>
          <DeleteResumeButton id={id} />
        </div>
        <ResumeAdmin id={id} />
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
