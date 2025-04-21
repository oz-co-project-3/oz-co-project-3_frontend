'use client';

import useSWR from 'swr';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CHATBOT_API } from '@/constants/chatbot';
import type { ChatbotPrompt } from '@/types/chatbot';
import ChatbotAddModal from './ChatbotAddModal';
import DataTable from '@/components/admin/table/DataTable';
import { columns } from './columns';

const fetcher = async (url: string): Promise<ChatbotPrompt[]> => {
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('데이터 불러오기 실패');
  }

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('응답 형식 오류');
  return data;
};

export default function ChatbotAdminClient() {
  const [openAddModal, setOpenAddModal] = useState(false);

  //SWR로 데이터 불러오기
  const {
    data: prompts = [],
    error,
    isLoading,
    mutate, // 재검증 함수 (onSuccess에 활용)
  } = useSWR(CHATBOT_API.BASE, fetcher);

  return (
    <div className='p-50 pt-20 pb-20'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold'>전체 응답 목록</h2>
        <Button
          className='bg-main-light hover:bg-main-dark text-white'
          onClick={() => setOpenAddModal(true)}
        >
          + 추가하기
        </Button>
      </div>

      <ChatbotAddModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSuccess={mutate} // 새로고침 대신 SWR 캐시를 갱신
      />

      {error && <p className='text-red-500'>에러 발생: {error.message}</p>}
      {isLoading ? (
        <p className='text-gray-500'>로딩 중...</p>
      ) : (
        <DataTable columns={columns} data={prompts} />
      )}
    </div>
  );
}
