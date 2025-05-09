'use client';

import dynamic from 'next/dynamic';

const JobPostingViewer = dynamic(() => import('../common/text-editor/JobPostingViewer'), {
  ssr: false,
  // TODO: loading: () => <p>에디터 로딩 중...</p>,
});

export default function JobPostingViewerLoader({ content }: { content: string }) {
  return <JobPostingViewer content={content} />;
}

// 뷰어 로드 시 에러 방지용 래퍼 컴포넌트
