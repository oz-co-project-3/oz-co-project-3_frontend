'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { fetchOnClient } from '@/api/clientFetcher';
import ConfirmButton from '@/components/common/ConfirmButton';

interface Props {
  id: string;
  status: string;
}

export default function JobPostingActionPanel({ id, status }: Props) {
  const router = useRouter();
  const [rejectReason, setRejectReason] = useState('');
  const [rejectOpen, setRejectOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const approve = async () => {
    setLoading(true);
    try {
      await fetchOnClient(`/api/admin/job-posting/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status: '모집중' }),
      });
      router.push('/admin/jobs');
    } catch (error) {
      alert('승인 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    if (!rejectReason.trim()) return alert('반려 사유를 입력해주세요.');
    setRejectLoading(true);
    try {
      await fetchOnClient(`/api/admin/job-posting/${id}/reject-posting/`, {
        method: 'POST',
        body: JSON.stringify({ content: rejectReason }),
      });
      await fetchOnClient(`/api/admin/job-posting/${id}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status: '반려됨' }),
      });
      setRejectOpen(false);
      router.push('/admin/jobs');
    } catch (error) {
      alert('반려 처리 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setRejectLoading(false);
    }
  };

  if (status !== '대기중') return null;

  return (
    <div className='mb-4 flex justify-end gap-2'>
      {/* 승인하기 - ConfirmButton 사용 */}
      <ConfirmButton
        title={loading ? '승인 중...' : '승인'}
        contentText='해당 공고를 승인 처리하시겠습니까?'
        actionType='emphasis'
        handleAction={approve}
      />

      {/*  반려하기 - 기존 Dialog 유지 */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogTrigger asChild>
          <Button
            variant='destructive'
            className='hover:bg-destructive/70 rounded-md px-4 py-2 text-sm'
          >
            반려하기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>반려 사유 입력</DialogTitle>
          </DialogHeader>
          <Textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder='반려 사유를 입력해주세요 (1~1000자)'
            rows={6}
          />
          <DialogFooter>
            <Button onClick={reject} disabled={rejectLoading} variant='destructive'>
              {rejectLoading ? '처리 중...' : '반려하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
