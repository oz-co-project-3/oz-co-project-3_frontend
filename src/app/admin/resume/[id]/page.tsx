import AdminLayout from '@/components/layout/AdminLayout';
import Resume from '@/components/resume/Resume';

// interface Props {
//   params: { id: string };
// }

export default async function AdminResumeDetailPage() {
  // const id = params.id;

  return (
    <AdminLayout>
      <section className='flex flex-col gap-4 rounded-md bg-white px-8 py-10'>
        <h2 className='border-b pb-4 text-2xl font-bold'>이력서 상세</h2>
        <Resume /> {/* 현재는 내부 mock 사용 */}
      </section>
    </AdminLayout>
  );
}
