import { Suspense } from 'react';
import UserEditPageClient from './_components/UserEditPageClient';

export default function UserEditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserEditPageClient />
    </Suspense>
  );
}