'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CHATBOT_API } from '@/constants/chatbot';
import { KeyedMutator } from 'swr';
import { ChatbotPrompt } from '@/types/chatbot';

interface Props {
  open: boolean;
  onClose: () => void; //닫기 누르면 호출되는거
  onSuccess: KeyedMutator<ChatbotPrompt[]>; //SWR mutate 함수(데이터 새로고침용)
}

export default function ChatbotAddModal({ open, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<number>(1);
  const [selectionPath, setSelectionPath] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState('');
  const [isTerminate, setIsTerminate] = useState(false);
  const [loading, setLoading] = useState(false);

  // 모달 열릴 때 초기화
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setStep(1);
    setSelectionPath('');
    setAnswer('');
    setOptions('');
    setIsTerminate(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_ADMIN_TOKEN!;
      const res = await fetch(CHATBOT_API.BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          step,
          selection_path: selectionPath,
          answer,
          options,
          is_terminate: isTerminate,
        }),
      });

      if (!res.ok) throw new Error('응답 추가 실패');

      await onSuccess(); //SWR 캐시 갱신
      resetForm();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 응답 추가</DialogTitle>
        </DialogHeader>

        <div className='space-y-3'>
          <Input
            type='number'
            placeholder='STEP'
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
          <Input
            placeholder='선택 경로 (예: 기업/회원가입)'
            value={selectionPath}
            onChange={(e) => setSelectionPath(e.target.value)}
          />
          <Input placeholder='응답' value={answer} onChange={(e) => setAnswer(e.target.value)} />
          <Input
            placeholder='옵션 (쉼표로 구분)'
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
          <label className='flex items-center gap-2 text-sm'>
            <Checkbox checked={isTerminate} onCheckedChange={(v) => setIsTerminate(!!v)} />
            종료 응답 여부
          </label>
          <div className='mt-4 text-right'>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? '저장 중...' : '저장'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
