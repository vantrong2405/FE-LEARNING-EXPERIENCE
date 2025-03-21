import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationProps {
  total: number
  page: number
  limit: number
  totalPages: number
  onPageChange: (newPage: number) => void
}

export function PaginationDemo({ total, page, limit, totalPages, onPageChange }: PaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem className={page <= 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}>
          <PaginationPrevious
            onClick={() => page > 1 && onPageChange(page - 1)}
            className='dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-black transition-colors'
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded transition-colors duration-200 cursor-pointer ${
                p === page
                  ? 'bg-purple-600 text-white font-bold dark:bg-purple-400 dark:text-black' // Active Page
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300' // Default
              }`}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis for large paginations */}
        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis className='text-gray-500 dark:text-gray-400' />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem className={page >= totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}>
          <PaginationNext
            onClick={() => page < totalPages && onPageChange(page + 1)}
            className='dark:text-gray-400 text-gray-600 hover:dark:text-white hover:text-black transition-colors'
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
