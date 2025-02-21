import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UpdateRoleBody, UpdateRoleBodyType } from '@/schemaValidations/role.schema'

const LIMIT = 30
const PAGE = 1
interface PermissionItem {
  module: string
  name: string
  apiPath: string
  method: string
  _id: number
  createdAt: Date
  updatedAt: Date
}

export default function EditRole({
  id,
  setId,
  onSubmitSuccess
}: {
  id?: number | undefined
  setId: (value: number | undefined) => void
  onSubmitSuccess?: () => void
}) {
  const form = useForm<UpdateRoleBodyType>({
    resolver: zodResolver(UpdateRoleBody),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  return (
    <Dialog>
      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Cập nhật Vai trò</DialogTitle>
          <DialogDescription>Các trường sau đây là bắt buộc: Tên, Mô tả</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form noValidate className='grid auto-rows-max items-start gap-4 md:gap-8' id='edit-role-form'>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='name'>Tên Vai trò</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Input id='name' className='w-full' {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='description'>Mô tả</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Input id='description' className='w-full' {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='edit-role-form'>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
