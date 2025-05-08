// app/public-jobs/PublicJobList.tsx
'use client';
import JobPostingItem from '@/components/common/jobPostingItem';
import { useSearchParams, usePathname } from 'next/navigation';
import CustomPagination from '@/components/common/pagination/CustomPagination';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';

export default function PublicJobList({
  data: { data: posts, total, limit },
}: {
  data: JobPostingListResponse;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <section>
      {posts.map((post) => (
        <JobPostingItem key={post.id} post={post} detailPagePath='/public-jobs' />
      ))}
      <CustomPagination
        currentPage={Number(searchParams.get('page')) || 0}
        totalPages={Math.ceil(total / limit)}
        createPageURL={createPageURL}
      />
    </section>
  );
}
