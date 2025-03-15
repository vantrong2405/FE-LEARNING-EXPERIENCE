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
        {/* Nút Previous - Ẩn nếu đang ở trang đầu */}
        <PaginationItem className={page <= 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}>
          <PaginationPrevious onClick={() => page > 1 && onPageChange(page - 1)} />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 rounded ${
                p === page ? 'bg-gray-300 text-gray-700 font-bold' : 'hover:bg-gray-200'
              }`}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem className={page >= totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}>
          <PaginationNext onClick={() => page < totalPages && onPageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
