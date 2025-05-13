'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import type { ChatbotPrompt, ChatbotBase } from '@/types/chatbot';
import type { KeyedMutator } from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';

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
  const [redirectUrl, setRedirectUrl] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    //수정 모드
    if (editTarget) {
      setStep(editTarget.step);
      setSelectionPath(editTarget.selection_path);
      setAnswer(editTarget.answer);
      setOptions(editTarget.options || '');
      setIsTerminate(editTarget.is_terminate);
      setRedirectUrl(editTarget.url || '');
    } else {
      // 추가 모드
      resetForm();
    }
  }, [open, editTarget]);
  

  const resetForm = () => {
    setStep(1);
    setSelectionPath('');
    setAnswer('');
    setOptions('');
    setIsTerminate(false);
    setRedirectUrl('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const url = editTarget ? `/api/admin/chatbot/${editTarget.id}/` : '/api/admin/chatbot/';
      const method = editTarget ? 'PATCH' : 'POST';

      // POST 시에는 id 없는 구조(ChatbotBase)로 전송
      const bodyData: ChatbotBase = {
        step,
        selection_path: selectionPath.trim(),
        answer,
        options: options.trim() || null,
        is_terminate: isTerminate,
        url: redirectUrl.trim() || undefined,
      };

      await fetchOnClient(url, {
        method,
        body: JSON.stringify(bodyData),
      });

      await onSuccess();
      resetForm();
      onClose();
    } catch (err) {
      console.error('저장 실패:', err);
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
          <Textarea
            placeholder='응답 내용'
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <Input
            placeholder='옵션 (쉼표로 구분)'
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
          <label className='flex items-center gap-2 text-sm'>
            <Checkbox checked={isTerminate} onCheckedChange={(v) => setIsTerminate(!!v)} />
            종료 응답 여부
          </label>
          <Input
            placeholder='이동할 URL (예: /free-board)'
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
          />

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
