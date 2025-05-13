'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import JobPostingTable from './JobPostingTable';
import useJobPostingList from '@/hooks/useJobPostingList';
import SkeletonPlaceholder from '@/components/common/SkeletonPlaceholder';

export default function JobPostingAdminClient() {
  const [tab, setTab] = useState<'approved' | 'unapproved'>('approved');
  const { postings, isLoading } = useJobPostingList();

  const approvedStatuses = ['모집중', '마감 임박', '모집 종료', '블라인드'];
  const approvedPostings = postings.filter((item) => approvedStatuses.includes(item.status));

  const unapprovedStatuses = ['대기중', '반려됨'];
  const unapprovedPostings = postings.filter((item) => unapprovedStatuses.includes(item.status));

  return (
    <div className='p-50 pt-20 pb-20'>
      <h2 className='p-2 text-xl font-bold'>전체 공고 목록</h2>

      {isLoading ? (
        <SkeletonPlaceholder rows={6} columns={5} />
      ) : (
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
      )}
    </div>
  );
}
