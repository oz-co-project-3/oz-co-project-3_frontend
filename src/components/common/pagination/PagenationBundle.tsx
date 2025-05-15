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
  mobile = false,
}: {
  currentPage: number;
  totalCount: number;
  url: string;
  pageSize: number;
  mobile?: boolean;
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

        {currentPage > (mobile ? 3 : 4) && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {!mobile && currentPage > 3 && (
          <PaginationItem className='max-sm:hidden'>
            <PaginationLink href={`${url}${currentPage - 2}`}>{currentPage - 2}</PaginationLink>
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
        {!mobile && currentPage < totalPages - 2 && (
          <PaginationItem className='max-sm:hidden'>
            <PaginationLink href={`${url}${currentPage + 2}`}>{currentPage + 2}</PaginationLink>
          </PaginationItem>
        )}

        {currentPage < totalPages - (mobile ? 2 : 3) && (
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
