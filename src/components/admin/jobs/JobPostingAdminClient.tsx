'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import JobPostingTable from './JobPostingTable';
import { JobPosting } from './columns';
import useSWR from 'swr';
import { fetchOnClient } from '@/api/clientFetcher';

export default function JobPostingAdminClient() {
  const [tab, setTab] = useState<'approved' | 'unapproved'>('approved');

  // 전체 공고 데이터 요청
  const { data = [] } = useSWR<JobPosting[]>('/api/admin/job-posting/', fetchOnClient);

  // 승인 공고: status가 아래 중 하나일 때
  const approvedStatuses = ['모집중', '"마감 임박', '모집 종료', '블라인드'];
  const approvedPostings = data.filter((item) => approvedStatuses.includes(item.status));

  // 미승인 공고: Pending or Rejected
  const unapprovedStatuses = ['대기중', '반려됨'];
  const unapprovedPostings = data.filter((item) => unapprovedStatuses.includes(item.status));

  return (
    <div className='p-50 pt-20 pb-20'>
      <h2 className='p-2 text-xl font-bold'>전체 공고 목록</h2>

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
