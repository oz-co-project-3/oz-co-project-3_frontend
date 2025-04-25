'use client';

import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CHATBOT_API } from '@/constants/chatbot';
import type { ChatbotPrompt } from '@/types/chatbot';
import ChatbotModal from './ChatbotModal';
import DataTable from '@/components/admin/table/DataTable';
import { getColumns } from './columns';

const fetcher = async (url: string): Promise<ChatbotPrompt[]> => {
  const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });//GET 요청 + 토큰 인증 + JSON 파싱

  if (!res.ok) throw new Error('데이터 불러오기 실패');
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('응답 형식 오류');
  return data;
};

export default function ChatbotAdminClient() {
  const [openModal, setOpenModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ChatbotPrompt | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const { data: prompts = [], error, isLoading, mutate } = useSWR(CHATBOT_API.BASE, fetcher);

  //STEP 정렬, 필터링
  const filteredPrompts = useMemo(() => {
    const sorted = [...prompts].sort((a, b) => a.step - b.step);
    return selectedStep !== null ? sorted.filter((p) => p.step === selectedStep) : sorted;
  }, [prompts, selectedStep]);

  //STEP 목록 만들기
  const stepOptions = useMemo(() => {
    const unique = Array.from(new Set(prompts.map((p) => p.step)));
    return unique.sort((a, b) => a - b);
  }, [prompts]);

  //수정
  const handleEdit = (row: ChatbotPrompt) => {
    setEditTarget(row);
    setOpenModal(true);
  };

  //삭제
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;
      const res = await fetch(CHATBOT_API.DETAIL(id), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('삭제 실패');
      mutate();
    } catch (err) {
      console.error('삭제 오류:', err);
    }
  };

  return (
    <div className='p-50 pt-20 pb-20'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold'>전체 응답 목록</h2>
        <Button
          className='bg-main-light hover:bg-main-dark text-white'
          onClick={() => {
            setEditTarget(null); // 수정 대상 초기화
            setOpenModal(true);
          }}
        >
          + 추가하기
        </Button>
      </div>

      {/* STEP 선택 */}
      <div className='mb-4 flex gap-2'>
        <Button
          variant={selectedStep === null ? 'default' : 'outline'}
          onClick={() => setSelectedStep(null)}
        >
          전체 보기
        </Button>
        {stepOptions.map((step) => (
          <Button
            key={step}
            variant={selectedStep === step ? 'default' : 'outline'}
            onClick={() => setSelectedStep(step)}
          >
            STEP {step}
          </Button>
        ))}
      </div>

      <ChatbotModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={mutate}
        editTarget={editTarget}
      />

      {error && <p className='text-red-500'>에러 발생: {error.message}</p>}
      {isLoading ? (
        <p className='text-gray-500'>로딩 중...</p>
      ) : (
        <DataTable
          columns={getColumns({ onEdit: handleEdit, onDelete: handleDelete })}
          data={filteredPrompts}
        />
      )}
    </div>
  );
}
