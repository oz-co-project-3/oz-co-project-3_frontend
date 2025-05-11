'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import useJobPostingList from '@/hooks/useJobPostingList';
import JobPostingTable from './JobPostingTable';

export default function JobPostingListClient() {
  const { postings, error, loading } = useJobPostingList();
  const [tab, setTab] = useState<'approved' | 'unapproved'>('approved');

  if (loading) return <p className='text-gray-400'>로딩 중...</p>;
  if (error) return <p className='text-red-500'>불러오기 실패</p>;

  // 승인 공고
  const approvedStatuses = ['모집중', '마감 임박', '모집 종료', '블라인드'];
  const approvedPostings = postings.filter((item) => approvedStatuses.includes(item.status));

  // 미승인 공고
  const unapprovedStatuses = ['대기중', '반려됨'];
  const unapprovedPostings = postings.filter((item) => unapprovedStatuses.includes(item.status));

  return (
    <div className='p-6'>
      <h2 className='mb-4 text-xl font-bold'>전체 공고 목록</h2>

      <Tabs value={tab} onValueChange={(value) => setTab(value as 'approved' | 'unapproved')}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='approved'>승인</TabsTrigger>
          <TabsTrigger value='unapproved'>미승인</TabsTrigger>
        </TabsList>

        <TabsContent value='approved'>
          <JobPostingTable data={approvedPostings} />
        </TabsContent>

        <TabsContent value='unapproved'>
          <JobPostingTable data={unapprovedPostings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
