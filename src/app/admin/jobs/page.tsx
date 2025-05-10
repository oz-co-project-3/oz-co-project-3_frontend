import JobPostingAdminClient from '@/components/admin/jobs/JobPostingAdminClient';
import AdminLayout from '@/components/layout/AdminLayout';

export default function AdminJobListPage() {
  return (
    <AdminLayout>
      <JobPostingAdminClient />
    </AdminLayout>
  );
}
