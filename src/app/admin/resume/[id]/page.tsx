'use client';

import { useParams } from 'next/navigation';
import AdminLayout from '@/components/layout/AdminLayout';
import DeleteResumeButton from '@/components/resume/DeleteResumeButton';
import Resume from '@/components/resume/Resume';

export default function AdminResumeDetailPage() {
  const params = useParams();
  const resumeId = params.id as string;

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
//나중에 API 연동, 그때 async function으로 다시 서버 컴포넌트화 가능
