import { Suspense } from 'react';
import PriviteJobsPage from './PriviteJobsPage';

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PriviteJobsPage />
    </Suspense>
  );
}
