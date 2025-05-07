'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchOnClient } from '@/api/clientFetcher';

interface Props {
  id: string;
}

export default function DeleteResumeButton({ id }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      await fetchOnClient(`/api/admin/resume/${id}/`, { method: 'DELETE' });
      alert('이력서가 삭제되었습니다.');
      router.push('/admin/user');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('삭제 중 오류가 발생했습니다.');
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
