'use client';

import { useSearchParams } from 'next/navigation';

export default function PostDetailPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('Id');
  return (
    <div>
      <h1>글 상세</h1>
      <p>게시글 ID : {postId}</p>
      <button>수정하기</button>
      <button>삭제하기</button>
      {/* 여기 글 내용 들어가기 */}
    </div>
  );
}
