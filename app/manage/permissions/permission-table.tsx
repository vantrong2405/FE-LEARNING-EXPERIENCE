'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { createContext, useContext, useEffect, useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { useSearchParams } from 'next/navigation'
import AddPermission from '@/app/manage/permissions/add-permission'
//import EditPermission from '@/app/manage/permissions/edit-permission'
import EditPermission from '@/app/manage/permissions/edit-permission'
import { PermissionListResType } from '@/schemaValidations/permission.schema'

type PermissionItem = PermissionListResType['data'][0]

const PermissionTableContext = createContext<{
  setPermissionIdEdit: (value: number) => void
  PermissionIdEdit: number | undefined
  PermissionDelete: PermissionItem | null
  setPermissionDelete: (value: PermissionItem | null) => void
}>({
  setPermissionIdEdit: (value: number | undefined) => {},
  PermissionIdEdit: undefined,
  PermissionDelete: null,
  setPermissionDelete: (value: PermissionItem | null) => {}
})

export const columns: ColumnDef<PermissionItem>[] = [
  {
    accessorKey: 'stt',
    header: 'STT',
    cell: ({ row }) => <div>{row.index + 1}</div> // row.index + 1 để có số thứ tự bắt đầu từ 1
  },

  {
    accessorKey: 'name',
    header: 'Tên',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setPermissionIdEdit, setPermissionDelete } = useContext(PermissionTableContext)
      const openEditPermission = () => {
        setPermissionIdEdit(row.original.id)
      }

      const openDeletePermission = () => {
        setPermissionDelete(row.original)
      }
      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <DotsHorizontalIcon className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditPermission}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeletePermission}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function AlertDialogDeletePermission({
  PermissionDelete,
  setPermissionDelete
}: {
  PermissionDelete: PermissionItem | null
  setPermissionDelete: (value: PermissionItem | null) => void
}) {
  return (
    <AlertDialog
      open={Boolean(PermissionDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setPermissionDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa món ăn?</AlertDialogTitle>
          <AlertDialogDescription>
            Món <span className='bg-foreground text-primary-foreground rounded px-1'>{PermissionDelete?.name}</span> sẽ
            bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
// Số lượng item trên 1 trang
const PAGE_SIZE = 10
export default function PermissionTable() {
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1
  const [PermissionIdEdit, setPermissionIdEdit] = useState<number | undefined>()
  const [PermissionDelete, setPermissionDelete] = useState<PermissionItem | null>(null)
  const data: any[] = []

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex, // Gía trị mặc định ban đầu, không có ý nghĩa khi data được fetch bất đồng bộ
    pageSize: PAGE_SIZE //default page size
  })

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE
    })
  }, [table, pageIndex])

  return (
    <PermissionTableContext.Provider
      value={{ PermissionIdEdit, setPermissionIdEdit, PermissionDelete, setPermissionDelete }}
    >
      <div className='w-full'>
        <EditPermission id={PermissionIdEdit} setId={setPermissionIdEdit} />
        <AlertDialogDeletePermission PermissionDelete={PermissionDelete} setPermissionDelete={setPermissionDelete} />
        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc tên'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <div className='ml-auto flex items-center gap-2'>
            <AddPermission />
          </div>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-end space-x-2 py-4'>
          <div className='text-xs text-muted-foreground py-4 flex-1 '>
            Hiển thị <strong>{table.getPaginationRowModel().rows.length}</strong> trong <strong>{data.length}</strong>{' '}
            kết quả
          </div>
        </div>
      </div>
    </PermissionTableContext.Provider>
  )
}
