'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle, Upload } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateRoleBody, CreateRoleBodyType } from '@/schemaValidations/role.schema'
import { Switch } from '@/components/ui/switch'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
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
export default function AddRole() {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateRoleBodyType>({
    resolver: zodResolver(CreateRoleBody),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size='sm' className='h-7 gap-1'>
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Thêm Vai trò</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[600px] max-h-screen overflow-auto'>
        <DialogHeader>
          <DialogTitle>Thêm Vai trò</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form noValidate className='grid auto-rows-max items-start gap-4 md:gap-8' id='add-role-form'>
            <div className='grid gap-4 py-4'>
              {/* Trường Name */}
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

              {/* Trường Description */}
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

              {/* Trường Status */}

              {/* Trường Permissions */}
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='add-role-form'>
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
