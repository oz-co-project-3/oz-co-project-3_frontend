export default async function JobDetailPage({ params }: { params: Promise<{ id: number }> }) {
  // 폴더명이 [id]라면 params.id로 접근
  const { id } = await params;

  return (
    <div>
      <h1>상세페이지</h1>
      <p>이 개인 공고의 ID는 {id}입니다.</p>
    </div>
  );
}
