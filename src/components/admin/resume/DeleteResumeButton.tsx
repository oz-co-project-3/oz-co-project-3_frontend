'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  id: string;
}

export default function DeleteResumeButton({ id }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      setIsDeleting(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_EXTERNAL_BASE_URL}/api/admin/resume/${id}/`,
        { method: 'DELETE' },
      );

      if (!res.ok) throw new Error('삭제 실패');

      alert('이력서가 삭제되었습니다.');
      router.push('/admin/user');
    } catch (err) {
      console.error(err);
      alert('삭제 실패');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className='inline-flex w-fit items-center justify-center rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50'
    >
      {isDeleting ? '삭제 중...' : '삭제'}
    </button>
  );
}
