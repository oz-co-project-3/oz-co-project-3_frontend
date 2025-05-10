import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationItem,
  PaginationContent,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

export default async function PagenationBundle({
  currentPage,
  totalCount,
  url,
  pageSize = 10,
}: {
  currentPage: number;
  totalCount: number;
  url: string;
  pageSize: number;
}) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {currentPage === 1 ? (
            <PaginationPrevious
              aria-disabled='true'
              href={`${url}${currentPage - 1}`}
              className='pointer-events-none opacity-50'
            />
          ) : (
            <PaginationPrevious href={`${url}${currentPage - 1}`} />
          )}
        </PaginationItem>
        {currentPage >= 3 && (
          <PaginationItem>
            <PaginationLink href={`${url}1`}>1</PaginationLink>
          </PaginationItem>
        )}

        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage > 1 && (
          <PaginationItem>
            <PaginationLink href={`${url}${currentPage - 1}`}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href={`${url}${currentPage}`} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationLink href={`${url}${currentPage + 1}`}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentPage <= totalPages - 2 && (
          <PaginationItem>
            <PaginationLink href={`${url}${totalPages}`}>{totalPages}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          {currentPage === totalPages ? (
            <PaginationNext
              aria-disabled='true'
              href={`${url}p=${currentPage + 1}`}
              className='pointer-events-none opacity-50'
            />
          ) : (
            <PaginationNext href={`${url}${currentPage + 1}`} />
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
