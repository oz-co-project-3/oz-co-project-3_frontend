'use client';
import JobPostingItem from '@/components/common/jobPostingItem';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import CustomPagination from '@/components/common/pagination/CustomPagination';
import { JobPostingListResponse } from '@/types/Schema/jobPostingSchema';

export default function PublicJobList({
  data: { data: posts, total, limit },
}: {
  data: JobPostingListResponse;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 페이지네이션 핸들러
  const createPageURL = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (newPage: number) => {
    router.push(createPageURL(newPage), { scroll: false });
  };

  return (
    <div className='mt-8'>
      {posts.map((post) => (
        <JobPostingItem key={post.id} post={post} detailPagePath='/public-jobs' />
      ))}
      <CustomPagination
        currentPage={Number(searchParams.get('page')) || 1}
        totalPages={Math.ceil(total / limit)}
        createPageURL={createPageURL}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
