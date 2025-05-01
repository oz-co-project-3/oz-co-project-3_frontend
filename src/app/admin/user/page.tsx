import { UserTabs } from '@/components/admin/user/UserTabs';

export default async function AdminUsersPage() {
  return (
    <div className='space-y-4'>
      <UserTabs />
    </div>
  );
}
