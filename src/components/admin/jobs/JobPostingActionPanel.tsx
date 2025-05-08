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
    } finally {
      setRejectLoading(false);
    }
  };

  if (status !== '대기중') return null;

  return (
    <div className='mb-4 flex justify-end gap-2'>
      <Button onClick={approve} disabled={loading}>
        {loading ? '승인 중...' : '승인하기'}
      </Button>
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogTrigger asChild>
          <Button variant='destructive'>반려하기</Button>
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
