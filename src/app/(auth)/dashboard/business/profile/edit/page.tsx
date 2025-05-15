import { Suspense } from 'react';
import UserEditPageClient from '@/components/common/userForms/UserEditPageClient';

export default function UserEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserEditPageClient />
    </Suspense>
  );
}
