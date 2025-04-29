'use client';

import { useState } from 'react';
import JobPostingEditor from '../common/text-editor/JobPostingEditor';

// page.tsx 또는 에디터를 사용하는 상위 컴포넌트에서
// import dynamic from 'next/dynamic';

// const JobPostingEditor = dynamic(() => import('@/components/common/textEditor/JobPostingEditor'), {
//   ssr: false,
// });

export default function JobPostingForm() {
  const [detailHTML, setDetailHTML] = useState<string>('');
  const [detailJSON, setDetailJSON] = useState<string>('');
  if (detailJSON) {
    console.log(JSON.parse(detailJSON));
  }

  return (
    <div>
      <JobPostingEditor setDetailHTML={setDetailHTML} setDetailJSON={setDetailJSON} />
      <div className='mt-4'>
        <div className='text-sm font-bold'>HTML</div>
        <div>{detailHTML}</div>
      </div>
      <div className='mt-4'>
        <div className='text-sm font-bold'>JSON</div>
        <div>{detailJSON}</div>
      </div>
    </div>
  );
}

// 폼으로 바꾸고, 에디터 위에도 텍스트 더 받아야함.
