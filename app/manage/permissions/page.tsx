import PermissionTable from '@/app/manage/permissions/permission-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Suspense } from 'react'

export default function PermissionPage() {
  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='space-y-2'>
        <Card x-chunk='dashboard-06-chunk-0'>
          <CardHeader>
            <CardTitle>Quyền</CardTitle>
            <CardDescription>Quản lý Quyền</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <PermissionTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
