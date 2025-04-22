'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CHATBOT_API } from '@/constants/chatbot';
import type { ChatbotPrompt } from '@/types/chatbot';
import type { KeyedMutator } from 'swr';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: KeyedMutator<ChatbotPrompt[]>;
  editTarget?: ChatbotPrompt | null;
}

export default function ChatbotModal({ open, onClose, onSuccess, editTarget }: Props) {
  const [step, setStep] = useState(1);
  const [selectionPath, setSelectionPath] = useState('');
  const [answer, setAnswer] = useState('');
  const [options, setOptions] = useState('');
  const [isTerminate, setIsTerminate] = useState(false);
  const [loading, setLoading] = useState(false);

  // 모달 열릴 때 초기값
  useEffect(() => {
    if (open) {
      if (editTarget) {
        setStep(editTarget.step);
        setSelectionPath(editTarget.selection_path);
        setAnswer(editTarget.answer);
        setOptions(editTarget.options || '');
        setIsTerminate(editTarget.is_terminate);
      } else {
        resetForm();
      }
    }
  }, [open, editTarget]);

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
      const url = editTarget ? CHATBOT_API.DETAIL(editTarget.id) : CHATBOT_API.BASE;
      const method = editTarget ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
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

      if (!res.ok) throw new Error(editTarget ? '수정 실패' : '추가 실패');

      await onSuccess(); // SWR 새로고침 (목록을 최신화시킴)
      resetForm(); //폼도 초기화
      onClose(); //닫기
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
          <DialogTitle>{editTarget ? '응답 수정' : '새 응답 추가'}</DialogTitle>
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
