'use client';

export default function Error({ error }: { error: Error }) {
  console.log(error);

  return (
    <div>
      <div>오류가 발생했습니다!</div>
      <pre>{error.message}</pre>
    </div>
  );
}
