//공공 상세페이지
'use client';

import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const params = useParams();
  // 폴더명이 [id]라면 params.id로 접근
  const { id } = params;

  return (
    <div>
      <h1>상세페이지</h1>
      <p>이 공공 공고의 ID는 {id}입니다.</p>
    </div>
  );
}
