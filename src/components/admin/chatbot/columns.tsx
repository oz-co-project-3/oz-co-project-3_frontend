'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ChatbotPrompt } from '@/types/chatbot';
import { Button } from '@/components/ui/button';

interface ActionsProps {
  onEdit: (row: ChatbotPrompt) => void;
  onDelete: (id: number) => void;
}

export const getColumns = ({ onEdit, onDelete }: ActionsProps): ColumnDef<ChatbotPrompt>[] => [
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
    cell: ({ row }) => (
      <div className='flex justify-end gap-2'>
        <Button size='sm' variant='outline' onClick={() => onEdit(row.original)}>
          수정
        </Button>
        <Button size='sm' variant='destructive' onClick={() => onDelete(row.original.id)}>
          삭제
        </Button>
      </div>
    ),
  },
];