import AdminLayout from '@/components/layout/AdminLayout';
import DeleteResumeButton from '@/components/resume/DeleteResumeButton';
import Resume from '@/components/resume/Resume';

interface Props {
  params: { id: string };
}

export default async function AdminResumeDetailPage({ params }: Props) {
  const resumeId = params.id;

  return (
    <AdminLayout>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        {/* 버튼을 감싸서 너비 제어 */}
        <div className='flex items-center justify-between border-b pb-4'>
          <h2 className='text-2xl font-bold'>이력서 상세</h2>
          <div className='flex justify-end'>
            <DeleteResumeButton id={resumeId} />
          </div>
        </div>

        <Resume />
      </section>
    </AdminLayout>
  );
}
