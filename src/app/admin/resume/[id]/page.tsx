import AdminLayout from '@/components/layout/AdminLayout';
import NotFound from '@/app/not-found';
import ResumeAdmin from '@/components/admin/resume/ResumeAdmin';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) NotFound();

  return (
    <AdminLayout>
      <ResumeAdmin id={id} />
    </AdminLayout>
  );
}
