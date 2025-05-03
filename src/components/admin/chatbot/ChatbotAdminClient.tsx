'use client';

import useSWR from 'swr';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CHATBOT_API } from '@/constants/chatbot';
import type { ChatbotPrompt } from '@/types/chatbot';
import ChatbotModal from './ChatbotModal';
import DataTable from '@/components/admin/table/DataTable';
import { getColumns } from './columns';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

const fetcher = async (url: string): Promise<ChatbotPrompt[]> => {
  const token = useAuthStore.getState().accessToken;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 401 에러처리: SWR 내에서는 여기서 throw 해야 onError로 감지됨
  if (res.status === 401) {
    useAuthStore.getState().logout(); // 로그아웃 처리
    if (typeof window !== 'undefined') {
      window.location.href = '/user/login';
    }
    throw new Error('인증이 만료되었습니다.');
  }

  if (!res.ok) throw new Error('데이터 불러오기 실패');
  const data = await res.json();
  return data;
};

export default function ChatbotAdminClient() {
  const [openModal, setOpenModal] = useState(false);
  const [editTarget, setEditTarget] = useState<ChatbotPrompt | null>(null);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const { data: prompts = [], error, isLoading, mutate } = useSWR(CHATBOT_API.BASE, fetcher);

  // STEP 오름차순 정렬 및 필터링
  const filteredPrompts = useMemo(() => {
    const sorted = [...prompts].sort((a, b) => a.step - b.step);
    return selectedStep !== null ? sorted.filter((p) => p.step === selectedStep) : sorted;
  }, [prompts, selectedStep]);

  // 중복 제거한 STEP 목록 추출
  const stepOptions = useMemo(() => {
    const unique = Array.from(new Set(prompts.map((p) => p.step)));
    return unique.sort((a, b) => a - b);
  }, [prompts]);

  // 수정 모드
  const handleEdit = (row: ChatbotPrompt) => {
    setEditTarget(row);
    setOpenModal(true);
  };

  // 삭제 요청
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmed) return;

    try {
      const res = await fetch(CHATBOT_API.DETAIL(id), {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 401) {
        logout();
        router.push('/user/login');
        return;
      }

      if (!res.ok) throw new Error('삭제 실패');
      mutate(); // 목록 갱신
    } catch (err) {
      console.error('삭제 오류:', err);
    }
  };

  return (
    <div className='p-50 pt-20 pb-20'>
      {/* 상단 헤더 + 추가 버튼 */}
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-xl font-bold'>전체 응답 목록</h2>
        <Button
          className='bg-main-light hover:bg-main-dark text-white'
          onClick={() => {
            setEditTarget(null);
            setOpenModal(true);
          }}
        >
          + 추가하기
        </Button>
      </div>

      {/* STEP 선택 버튼 */}
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

      {/* 응답 추가/수정 모달 */}
      <ChatbotModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={mutate}
        editTarget={editTarget}
      />

      {/* 에러 및 로딩 처리 */}
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
