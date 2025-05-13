'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { fetchOnClient } from '@/api/clientFetcher';
import ConfirmButton from '@/components/common/ConfirmButton';

interface Props {
  id: string;
}

export default function DeleteResumeButton({ id }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await fetchOnClient(`/api/admin/resume/${id}/`, {
        method: 'DELETE',
      });
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
    <ConfirmButton
      handleAction={handleDelete}
      title={isDeleting ? '삭제 중...' : '삭제'}
      contentText='삭제된 이력서는 복구할 수 없습니다. 그래도 삭제하시겠습니까?'
      actionType='warning'
    />
  );
}
