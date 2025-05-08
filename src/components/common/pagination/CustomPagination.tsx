'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

type Props = {
  currentPage: number;
  totalPages: number;
  createPageURL: (newPage: number) => string;
  onPageChange?: (newPage: number) => void;
};

const MAX_PAGE_NUMBERS = 10;

export default function CustomPagination({
  currentPage,
  totalPages,
  createPageURL,
  onPageChange,
}: Props) {
  // 표시할 페이지 번호 범위 계산
  let startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_NUMBERS / 2));
  let endPage = startPage + MAX_PAGE_NUMBERS - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_PAGE_NUMBERS + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 페이지 클릭 시 처리 함수
  const handleClick = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(Math.max(currentPage - 1, 1))}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : 0}
            onClick={(e) => {
              e.preventDefault();
              handleClick(Math.max(currentPage - 1, 1));
            }}
          />
        </PaginationItem>

        {/* 첫 페이지 및 앞쪽 생략 부호 */}
        {startPage > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                href={createPageURL(1)}
                isActive={currentPage === 1}
                aria-current={currentPage === 1 ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {startPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {/* 페이지 번호 */}
        {pageNumbers.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href={createPageURL(page)}
              isActive={currentPage === page}
              aria-current={currentPage === page ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                handleClick(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 뒤쪽 생략 부호 및 마지막 페이지 */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                href={createPageURL(totalPages)}
                isActive={currentPage === totalPages}
                aria-current={currentPage === totalPages ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 다음 버튼 */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(Math.min(currentPage + 1, totalPages))}
            aria-disabled={currentPage >= totalPages}
            tabIndex={currentPage >= totalPages ? -1 : 0}
            onClick={(e) => {
              e.preventDefault();
              handleClick(Math.min(currentPage + 1, totalPages));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
