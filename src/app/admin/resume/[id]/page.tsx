import AdminLayout from '@/components/layout/AdminLayout';
import DeleteResumeButton from '@/components/resume/DeleteResumeButton';
import Resume from '@/components/resume/Resume';

// 수정: Props 인터페이스 제거하고 params에 직접 타입 지정
export default async function AdminResumeDetailPage({ params }: { params: { id: string } }) {
  const resumeId = params.id;

  return (
    <AdminLayout>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
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
