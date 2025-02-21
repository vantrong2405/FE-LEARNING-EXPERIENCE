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
import { RoleListResType } from '@/schemaValidations/role.schema'
import EditRole from '@/app/manage/roles/edit-role'
import AddRole from '@/app/manage/roles/add-role'

type RoleItem = RoleListResType['data'][0]

const RoleTableContext = createContext<{
  setRoleIdEdit: (value: number) => void
  RoleIdEdit: number | undefined
  RoleDelete: RoleItem | null
  setRoleDelete: (value: RoleItem | null) => void
}>({
  setRoleIdEdit: (value: number | undefined) => {},
  RoleIdEdit: undefined,
  RoleDelete: null,
  setRoleDelete: (value: RoleItem | null) => {}
})

export const columns: ColumnDef<RoleItem>[] = [
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
    accessorKey: 'isActive',
    header: 'Trạng thái',
    cell: ({ row }) => <div>{row.getValue('isActive') ? 'Active' : 'Inactive'}</div>
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setRoleIdEdit, setRoleDelete } = useContext(RoleTableContext)
      const openEditRole = () => {
        setRoleIdEdit(row.original.id)
      }

      const openDeleteRole = () => {
        setRoleDelete(row.original)
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
            <DropdownMenuItem onClick={openEditRole}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteRole}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

function AlertDialogDeleteRole({
  RoleDelete,
  setRoleDelete
}: {
  RoleDelete: RoleItem | null
  setRoleDelete: (value: RoleItem | null) => void
}) {
  return (
    <AlertDialog
      open={Boolean(RoleDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setRoleDelete(null)
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa món ăn?</AlertDialogTitle>
          <AlertDialogDescription>
            Món <span className='bg-foreground text-primary-foreground rounded px-1'>{RoleDelete?.name}</span> sẽ bị xóa
            vĩnh viễn
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
export default function RoleTable() {
  const searchParam = useSearchParams()
  const page = searchParam.get('page') ? Number(searchParam.get('page')) : 1
  const pageIndex = page - 1
  const [RoleIdEdit, setRoleIdEdit] = useState<number | undefined>()
  const [RoleDelete, setRoleDelete] = useState<RoleItem | null>(null)
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
    <RoleTableContext.Provider value={{ RoleIdEdit, setRoleIdEdit, RoleDelete, setRoleDelete }}>
      <div className='w-full'>
        <EditRole id={RoleIdEdit} setId={setRoleIdEdit} />
        <AlertDialogDeleteRole RoleDelete={RoleDelete} setRoleDelete={setRoleDelete} />
        <div className='flex items-center py-4'>
          <Input
            placeholder='Lọc tên'
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
            className='max-w-sm'
          />
          <div className='ml-auto flex items-center gap-2'>
            <AddRole />
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
    </RoleTableContext.Provider>
  )
}
