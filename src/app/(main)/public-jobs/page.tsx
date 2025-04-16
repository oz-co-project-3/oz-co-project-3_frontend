import { Suspense } from 'react';
import PublicJobsPage from './PublicJobsPage';

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PublicJobsPage />
    </Suspense>
  );
}
