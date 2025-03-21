'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { exportToExcel, formatCurrency } from '@/lib/excel'
import { useAddCourseMutation, useCourseQuery, useDeleteCourseMutation } from '@/queries/useCourse'
import { pagination } from '@/constants/pagination-config'
import { formatDate, handleErrorApi } from '@/lib/utils'
import { toast } from 'sonner'
import { Course } from '@/models/course.type'
import { Icons } from '@/components/ui/icons'
import { useLevelListQuery } from '@/queries/useLevel'
import { useCategoryListQuery } from '@/queries/useCategory'
import { useUploadMediaMutation } from '@/queries/useMedia'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CoursesBody, courseSchema, CreatecourseSchema } from '@/schemaValidator/course.schema'

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false)
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null)
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [bannerUrlFile, setBannerUrlFile] = useState<File | null>(null)
  const [thumbnailUrlFile, setThumbnailUrlFile] = useState<File | null>(null)

  const coursesPerPage = 5
  const [page, setPage] = useState(pagination.PAGE)
  const courseQuery = useCourseQuery(pagination.LIMIT, page)
  const courses = courseQuery.data?.payload.data.data ?? []
  const levelListQuery = useLevelListQuery(pagination.LIMIT, pagination.PAGE)
  const categoryListQuery = useCategoryListQuery(pagination.LIMIT, pagination.PAGE)
  const addCourseMutation = useAddCourseMutation()
  const uploadImageMediaMutation = useUploadMediaMutation()

  const form = useForm<CoursesBody>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      bannerUrl: '',
      categoryId: '',
      description: '',
      levelId: '',
      price: undefined,
      thumbnailUrl: '',
      title: ''
    }
  })

  {
    Object.keys(form.formState.errors).length > 0 && (
      <p className='text-red-500 text-sm'>Có lỗi trong form, vui lòng kiểm tra lại.</p>
    )
  }

  const previewAvatarFromFile = useMemo(() => {
    const previews: { banner?: string; thumbnail?: string } = {}

    if (bannerUrlFile) {
      previews.banner = URL.createObjectURL(bannerUrlFile)
    }

    if (thumbnailUrlFile) {
      previews.thumbnail = URL.createObjectURL(thumbnailUrlFile)
    }

    return previews
  }, [bannerUrlFile, thumbnailUrlFile])

  const onSubmit = async (values: CoursesBody) => {
    if (addCourseMutation.isPending) return

    try {
      let bannerUrl = values.bannerUrl
      let thumbnailUrl = values.thumbnailUrl

      // Upload bannerUrl nếu có file
      if (bannerUrlFile) {
        const formData = new FormData()
        formData.append('file', bannerUrlFile) // Sử dụng bannerUrlFile thay vì banner
        const uploadResponse = await uploadImageMediaMutation.mutateAsync(formData)

        if (!uploadResponse?.payload?.data?.url) {
          throw new Error('Upload banner failed: No valid URL received')
        }

        bannerUrl = uploadResponse.payload.data.url
      }

      if (thumbnailUrlFile) {
        const formData = new FormData()
        formData.append('file', thumbnailUrlFile)
        const uploadResponse = await uploadImageMediaMutation.mutateAsync(formData)

        if (!uploadResponse?.payload?.data?.url) {
          throw new Error('Upload thumbnail failed: No valid URL received')
        }

        thumbnailUrl = uploadResponse.payload.data.url
      }

      const body: CoursesBody = {
        ...values,
        bannerUrl,
        thumbnailUrl
      }

      await addCourseMutation.mutateAsync(body)

      toast.success('Tạo khóa học thành công')
      setIsAddCourseOpen(false)
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError
      })
    }
  }

  const levelList =
    levelListQuery.data?.payload.data.data.map((item) => ({
      id: item.id,
      title: item.name
    })) ?? []

  const categoryList =
    categoryListQuery.data?.payload.data.data.map((item) => ({
      id: item.id,
      title: item.name
    })) ?? []

  // Filter courses based on search term, category, and status
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || course.category.id === selectedCategory
    const matchesStatus = selectedStatus === 'all' || course.isPublished === (selectedStatus === 'published')

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)

  // Handle edit course
  const handleEditCourse = (course: Course): void => {
    setCurrentCourse(course)
    setIsEditCourseOpen(true)
  }

  // Handle checkbox selection
  const handleSelectCourse = (courseId: string): void => {
    if (selectedCourses.includes(String(courseId))) {
      setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
    } else {
      setSelectedCourses([...selectedCourses, courseId])
    }
  }

  const handleSelectAll = () => {
    if (selectedCourses.length === currentCourses.length) {
      setSelectedCourses([])
    } else {
      setSelectedCourses(currentCourses.map((course) => course.id))
    }
  }

  const { mutateAsync } = useDeleteCourseMutation()
  const deleteCourse = async (id: string) => {
    if (id) {
      try {
        await mutateAsync(id)

        toast.success('Delete Course Successfully')
      } catch (error) {
        handleErrorApi({
          error
        })
      }
    }
  }

  // Format price
  const formatPrice: { (price: number): string } = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
  }

  // Handle export to Excel
  const handleExportExcel = () => {
    const columns = [
      { key: 'id', header: 'Mã khóa học' },
      { key: 'title', header: 'Tên khóa học' },
      { key: 'instructor', header: 'Giảng viên' },
      {
        key: 'price',
        header: 'Giá',
        format: (value: number) => formatCurrency(value)
      },
      { key: 'category', header: 'Danh mục' },
      { key: 'students', header: 'Số học viên' },
      {
        key: 'rating',
        header: 'Đánh giá',
        format: (value: number) => value.toFixed(1)
      },
      { key: 'created', header: 'Ngày tạo' }
    ]

    exportToExcel({
      filename: 'Danh_sach_khoa_hoc',
      sheetName: 'Khóa học',
      data: filteredCourses,
      columns
    })
  }

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setBannerUrlFile(file)
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setThumbnailUrlFile(file)
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0D0A25] to-[#1A1744] text-white p-6'>
      <div className='max-w-9xl mx-auto'>
        <div className='flex items-center justify-end mb-6'>
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
            <Button
              variant='outline'
              className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto text-xs sm:text-sm'
              onClick={handleExportExcel}
            >
              <Icons.Download className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
              <span>Xuất Excel</span>
            </Button>
            <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
              <DialogTrigger asChild>
                <Button className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto text-xs sm:text-sm'>
                  <Icons.Plus className='sm:h-4 sm:w-4 mr-1 sm:mr-2' />
                  <span>Thêm Khóa Học</span>
                </Button>
              </DialogTrigger>
              <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
                <DialogHeader>
                  <DialogTitle className='text-xl text-purple-400'>Thêm Khóa Học Mới</DialogTitle>
                  <DialogDescription className='text-gray-400'>Điền thông tin để tạo khóa học mới</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-4'>
                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='title' className='text-white'>
                        Tiêu đề khóa học
                      </Label>
                      <Input
                        {...form.register('title')}
                        id='title'
                        placeholder='Nhập tiêu đề bài học'
                        className={`bg-gray-800 border text-white ${form.formState.errors.title ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.title && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.title.message}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='categoryId' className='text-white'>
                        Danh Mục
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          setSelectedCategory(value)
                          form.setValue('categoryId', value)
                        }}
                      >
                        <SelectTrigger
                          id='categoryId'
                          className={`bg-gray-800 border text-white ${form.formState.errors.categoryId ? 'border-red-500' : 'border-gray-700'}`}
                        >
                          <SelectValue placeholder='Chọn khóa học' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {categoryList.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.categoryId && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.categoryId.message}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='levelId' className='text-white'>
                        Cấp độ
                      </Label>
                      <Select onValueChange={(value) => form.setValue('levelId', value)}>
                        <SelectTrigger
                          id='levelId'
                          className={`bg-gray-800 border text-white ${form.formState.errors.levelId ? 'border-red-500' : 'border-gray-700'}`}
                        >
                          <SelectValue placeholder='Chọn khóa học' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          {levelList.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              {level.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.levelId && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.levelId.message}</p>
                      )}
                    </div>

                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='description' className='text-white'>
                        Mô tả khóa học
                      </Label>
                      <Textarea
                        {...form.register('description')}
                        id='description'
                        placeholder='Nhập mô tả video'
                        className={`bg-gray-800 border text-white ${form.formState.errors.description ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.description && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.description.message}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-white'>Ảnh thu nhỏ khóa học</Label>
                      <div
                        className='border-2 border-dashed border-gray-700 rounded-md p-4 text-center cursor-pointer'
                        onClick={() => document.getElementById('thumbnailUpload')?.click()}
                      >
                        {thumbnailUrlFile ? (
                          <img
                            src={URL.createObjectURL(thumbnailUrlFile)}
                            alt='Ảnh thu nhỏ khóa học'
                            className='w-full h-40 object-cover rounded-md'
                          />
                        ) : (
                          <div className='flex flex-col items-center'>
                            <Icons.Image className='h-8 w-8 text-gray-400 mb-2' />
                            <p className='text-sm text-gray-400 mb-2'>Kéo thả hoặc nhấp để tải lên</p>
                            <p className='text-xs text-gray-500'>PNG, JPG hoặc GIF (Tối đa 2MB)</p>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              className='mt-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            >
                              <Icons.Upload className='h-4 w-4 mr-2' /> Chọn tệp
                            </Button>
                          </div>
                        )}
                      </div>
                      <Input
                        type='file'
                        id='thumbnailUpload'
                        className='hidden'
                        accept='image/png, image/jpeg, image/gif'
                        onChange={handleThumbnailChange}
                      />
                    </div>

                    <div className='space-y-2'>
                      <Label className='text-white'>Ảnh bìa khóa học</Label>
                      <div
                        className='border-2 border-dashed border-gray-700 rounded-md p-4 text-center cursor-pointer'
                        onClick={() => document.getElementById('bannerUpload')?.click()}
                      >
                        {bannerUrlFile ? (
                          <img
                            src={URL.createObjectURL(bannerUrlFile)}
                            alt='Ảnh bìa khóa học'
                            className='w-full h-40 object-cover rounded-md'
                          />
                        ) : (
                          <div className='flex flex-col items-center'>
                            <Icons.Image className='h-8 w-8 text-gray-400 mb-2' />
                            <p className='text-sm text-gray-400 mb-2'>Kéo thả hoặc nhấp để tải lên</p>
                            <p className='text-xs text-gray-500'>PNG, JPG hoặc GIF (Tối đa 2MB)</p>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              className='mt-2 bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                            >
                              <Icons.Upload className='h-4 w-4 mr-2' /> Chọn tệp
                            </Button>
                          </div>
                        )}
                      </div>
                      <Input
                        type='file'
                        id='bannerUpload'
                        className='hidden'
                        accept='image/png, image/jpeg, image/gif'
                        onChange={handleBannerChange}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='price' className='text-white'>
                        Giá
                      </Label>
                      <Input
                        {...form.register('price', { valueAsNumber: true })}
                        id='price'
                        type='number'
                        min='1'
                        className={`bg-gray-800 border text-white ${form.formState.errors.price ? 'border-red-500' : 'border-gray-700'}`}
                      />
                      {form.formState.errors.price && (
                        <p className='text-red-500 text-sm'>{form.formState.errors.price.message}</p>
                      )}
                    </div>
                  </div>

                  <DialogFooter className='flex-col sm:flex-row gap-2 sm:gap-0'>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setIsAddCourseOpen(false)}
                      className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white w-full sm:w-auto'
                    >
                      Hủy
                    </Button>
                    <Button type='submit' className='bg-purple-600 hover:bg-purple-700 w-full sm:w-auto'>
                      Thêm video
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card className='bg-gray-900 border-gray-700 shadow-xl mb-6'>
          <CardHeader>
            <CardTitle className='text-xl text-purple-400'>Bộ lọc</CardTitle>
            <CardDescription className='text-gray-400'>Lọc danh sách khóa học theo các tiêu chí</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <Label htmlFor='search' className='text-white mb-2 block'>
                  Tìm kiếm
                </Label>
                <div className='relative'>
                  <Icons.Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                  <Input
                    id='search'
                    type='search'
                    placeholder='Tìm theo tên khóa học, giảng viên...'
                    className='pl-8 bg-gray-800 border-gray-700 text-white'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='category' className='text-white mb-2 block'>
                  Danh mục
                </Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn danh mục' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả danh mục</SelectItem>
                    <SelectItem value='Web Development'>Web Development</SelectItem>
                    <SelectItem value='Mobile Development'>Mobile Development</SelectItem>
                    <SelectItem value='Data Science'>Data Science</SelectItem>
                    <SelectItem value='Design'>Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='status' className='text-white mb-2 block'>
                  Trạng thái
                </Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                    <SelectValue placeholder='Chọn trạng thái' />
                  </SelectTrigger>
                  <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                    <SelectItem value='all'>Tất cả trạng thái</SelectItem>
                    <SelectItem value='published'>Đã xuất bản</SelectItem>
                    <SelectItem value='draft'>Bản nháp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gray-900 border-gray-700 shadow-xl'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <div>
                <CardTitle className='text-xl text-purple-400'>Danh sách khóa học</CardTitle>
                <CardDescription className='text-gray-400'>
                  {filteredCourses.length} khóa học được tìm thấy
                </CardDescription>
              </div>
              {selectedCourses.length > 0 && (
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-400'>Đã chọn {selectedCourses.length} khóa học</span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <Icons.CheckCircle className='h-4 w-4 mr-1' /> Xuất bản
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                  >
                    <Icons.XCircle className='h-4 w-4 mr-1' /> Ẩn
                  </Button>
                  <Button variant='destructive' size='sm'>
                    <Icons.Trash2 className='h-4 w-4 mr-1' /> Xóa
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-gray-800'>
                    <th className='text-left py-3 px-4'>
                      <Checkbox
                        checked={selectedCourses.length === currentCourses.length && currentCourses.length > 0}
                        onCheckedChange={handleSelectAll}
                        className='border-gray-600'
                      />
                    </th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Khóa học</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Giảng viên</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Giá</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Học viên</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Đánh giá</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Trạng thái</th>
                    <th className='text-left py-3 px-4 text-gray-400 font-medium'>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCourses.map((course) => (
                    <tr key={course.id} className='border-b border-gray-800 hover:bg-gray-800/50'>
                      <td className='py-3 px-4'>
                        <Checkbox
                          checked={selectedCourses.includes(course.id)}
                          onCheckedChange={() => handleSelectCourse(course.id)}
                          className='border-gray-600'
                        />
                      </td>
                      <td className='py-3 px-4'>
                        <div className='flex items-center'>
                          <img
                            src={course.thumbnailUrl || '/placeholder.svg'}
                            alt={course.title}
                            className='w-12 h-8 object-cover rounded mr-3'
                          />
                          <div>
                            <div className='font-medium'>{course.title}</div>
                            <div className='text-xs text-gray-400'>Tạo: {formatDate(course.createdAt)}</div>
                          </div>
                        </div>
                      </td>
                      <td className='py-3 px-4 text-gray-300'>{course.instructor.name}</td>
                      <td className='py-3 px-4 text-purple-400 font-medium'>{formatPrice(course.price)}</td>
                      <td className='py-3 px-4 text-gray-300'>{course.totalReviews}</td>
                      <td className='py-3 px-4'>
                        {course.rating > 0 ? (
                          <div className='flex items-center'>
                            <span className='mr-1'>{course.rating}</span>
                            <Icons.Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
                          </div>
                        ) : (
                          <span className='text-gray-500'>N/A</span>
                        )}
                      </td>
                      <td className='py-3 px-4'>
                        <Badge
                          className={
                            course.isPublished === true
                              ? 'bg-green-900/30 text-green-500 hover:bg-green-900/40'
                              : 'bg-yellow-900/30 text-yellow-500 hover:bg-yellow-900/40'
                          }
                        >
                          {course.isPublished === true ? 'Đã xuất bản' : 'Bản nháp'}
                        </Badge>
                      </td>
                      <td className='py-3 px-4'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800'
                            >
                              <Icons.MoreHorizontal className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className='bg-gray-800 border-gray-700 text-white'>
                            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                            <DropdownMenuSeparator className='bg-gray-700' />
                            <DropdownMenuItem
                              className='hover:bg-gray-700 cursor-pointer'
                              onClick={() => handleEditCourse(course as Course)}
                            >
                              <Icons.Edit className='h-4 w-4 mr-2' /> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              <Icons.Eye className='h-4 w-4 mr-2' /> Xem trước
                            </DropdownMenuItem>
                            <DropdownMenuItem className='hover:bg-gray-700 cursor-pointer'>
                              {course.isPublished === true ? (
                                <>
                                  <Icons.EyeOff className='h-4 w-4 mr-2' /> Ẩn khóa học
                                </>
                              ) : (
                                <>
                                  <Icons.CheckCircle className='h-4 w-4 mr-2' /> Xuất bản
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className='bg-gray-700' />
                            <DropdownMenuItem
                              className='text-red-500 hover:bg-gray-700 cursor-pointer'
                              onClick={() => deleteCourse(course.id)}
                            >
                              <Icons.Trash2 className='h-4 w-4 mr-2' /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-between mt-6'>
              <div className='text-sm text-gray-400'>
                Hiển thị {indexOfFirstCourse + 1}-{Math.min(indexOfLastCourse, filteredCourses.length)} trong số{' '}
                {filteredCourses.length} khóa học
              </div>
              <div className='flex items-center space-x-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  <Icons.ChevronLeft className='h-4 w-4' />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  <Icons.ChevronRight className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Course Dialog */}
        {currentCourse && (
          <Dialog open={isEditCourseOpen} onOpenChange={setIsEditCourseOpen}>
            <DialogContent className='bg-gray-900 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle className='text-xl text-purple-400'>Chỉnh sửa Khóa Học</DialogTitle>
                <DialogDescription className='text-gray-400'>Cập nhật thông tin khóa học</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue='basic' className='mt-4'>
                <TabsList className='bg-gray-800 mb-4'>
                  <TabsTrigger value='basic' className='text-white data-[state=active]:bg-purple-600'>
                    Thông tin cơ bản
                  </TabsTrigger>
                  <TabsTrigger value='content' className='text-white data-[state=active]:bg-purple-600'>
                    Nội dung
                  </TabsTrigger>
                  <TabsTrigger value='pricing' className='text-white data-[state=active]:bg-purple-600'>
                    Giá & Khuyến mãi
                  </TabsTrigger>
                  <TabsTrigger value='media' className='text-white data-[state=active]:bg-purple-600'>
                    Hình ảnh & Video
                  </TabsTrigger>
                </TabsList>

                <TabsContent value='basic'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-title' className='text-white'>
                        Tên khóa học
                      </Label>
                      <Input
                        id='edit-title'
                        defaultValue={currentCourse.title}
                        className='bg-gray-800 border-gray-700 text-white'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-category' className='text-white'>
                        Danh mục
                      </Label>
                      <Select defaultValue={currentCourse.category.name.toLowerCase().replace(/\s+/g, '-')}>
                        <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn danh mục' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          <SelectItem value='web-development'>Web Development</SelectItem>
                          <SelectItem value='mobile-development'>Mobile Development</SelectItem>
                          <SelectItem value='data-science'>Data Science</SelectItem>
                          <SelectItem value='design'>Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2 md:col-span-2'>
                      <Label htmlFor='edit-description' className='text-white'>
                        Mô tả
                      </Label>
                      <Textarea
                        id='edit-description'
                        placeholder='Mô tả khóa học'
                        className='bg-gray-800 border-gray-700 text-white'
                        rows={5}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value='pricing'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-price' className='text-white'>
                        Giá khóa học (VND)
                      </Label>
                      <div className='relative'>
                        <Icons.DollarSign className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-400' />
                        <Input
                          id='edit-price'
                          type='number'
                          defaultValue={currentCourse.price}
                          className='pl-8 bg-gray-800 border-gray-700 text-white'
                        />
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='edit-status' className='text-white'>
                        Trạng thái
                      </Label>
                      <Select defaultValue={currentCourse.isPublished ? 'published' : 'draft'}>
                        <SelectTrigger className='bg-gray-800 border-gray-700 text-white'>
                          <SelectValue placeholder='Chọn trạng thái' />
                        </SelectTrigger>
                        <SelectContent className='bg-gray-800 border-gray-700 text-white'>
                          <SelectItem value='published'>Đã xuất bản</SelectItem>
                          <SelectItem value='draft'>Bản nháp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className='mt-6'>
                <Button
                  variant='outline'
                  onClick={() => setIsEditCourseOpen(false)}
                  className='bg-gray-800 border-gray-700 hover:bg-gray-700 text-white'
                >
                  Hủy
                </Button>
                <Button className='bg-purple-600 hover:bg-purple-700'>Lưu thay đổi</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
