// components/CustomPagination.tsx
'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
  createPageURL: (page: number) => string;
};

export default function CustomPagination({ currentPage, totalPages, createPageURL }: Props) {
  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}
          />
        </PaginationItem>

        {/* 페이지 번호 */}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink href={createPageURL(i + 1)} isActive={currentPage === i + 1}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 다음 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
