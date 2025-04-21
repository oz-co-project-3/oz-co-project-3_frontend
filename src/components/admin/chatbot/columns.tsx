'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ChatbotPrompt } from '@/types/chatbot';
import { Button } from '@/components/ui/button';
import { CHATBOT_API } from '@/constants/chatbot';

export const columns: ColumnDef<ChatbotPrompt>[] = [
  {
    accessorKey: 'step',
    header: 'STEP',
  },
  {
    accessorKey: 'selection_path',
    header: '선택 경로',
  },
  {
    accessorKey: 'answer',
    header: '응답',
  },
  {
    accessorKey: 'options',
    header: '옵션',
  },
  {
    accessorKey: 'is_terminate',
    header: '종료',
    cell: ({ row }) => (row.original.is_terminate ? '✅' : ''),
  },
  {
    id: 'actions',
    header: '관리',
    cell: ({ row }) => {
      const handleEdit = () => {
        console.log('수정 클릭:', row.original.id);
        // TODO: 수정 모달 열기
      };
  
      const handleDelete = async () => {
        const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed) return;
  
        try {
          const res = await fetch(CHATBOT_API.DETAIL(row.original.id), {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!res.ok) throw new Error('삭제 실패');
          window.location.reload(); // 또는 외부에서 props.onSuccess() 호출
        } catch (err) {
          console.error('삭제 오류:', err);
        }
      };
  
      return (
        <div className='flex justify-end gap-2'>
          <Button size='sm' variant='outline' onClick={handleEdit}>
            수정
          </Button>
          <Button size='sm' variant='destructive' onClick={handleDelete}>
            삭제
          </Button>
        </div>
      );
    },
  }
];