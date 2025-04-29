'use client';

// page.tsx 또는 에디터를 사용하는 상위 컴포넌트에서
// import dynamic from 'next/dynamic';

// const JobPostingEditor = dynamic(() => import('@/components/common/textEditor/JobPostingEditor'), {
//   ssr: false,
// });

import JobPostingEditor from '../common/textEditor/JobPostingEditor';

export default function JobPostingForm() {
  return (
    <div>
      <JobPostingEditor />
    </div>
  );
}

// 폼으로 바꾸고, 에디터 위에도 텍스트 더 받아야함.
