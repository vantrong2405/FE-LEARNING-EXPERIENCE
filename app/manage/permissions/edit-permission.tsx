'use client'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { UpdatePermissionBody, UpdatePermissionBodyType } from '@/schemaValidations/permission.schema'

export default function EditPermission({
  id,
  setId,
  onSubmitSuccess
}: {
  id?: number | undefined
  setId: (value: number | undefined) => void
  onSubmitSuccess?: () => void
}) {
  const form = useForm<UpdatePermissionBodyType>({
    resolver: zodResolver(UpdatePermissionBody),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  return (
    <Dialog>
      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Cập nhật Quyền</DialogTitle>
          <DialogDescription>Các trường sau đây là bắ buộc: Name,Address </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form noValidate className='grid auto-rows-max items-start gap-4 md:gap-8' id='edit-permission-form'>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <div className='grid grid-cols-4 items-center justify-items-start gap-4'>
                      <Label htmlFor='name'>Tên Quyền</Label>
                      <div className='col-span-3 w-full space-y-2'>
                        <Input id='name' className='w-full' {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit'>Lưu</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
