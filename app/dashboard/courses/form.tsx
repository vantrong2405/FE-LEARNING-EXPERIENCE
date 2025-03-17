'use client'

import { useState, useEffect, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'
import Link from 'next/link'
import { pathURL } from '@/constants/path'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion, AnimatePresence } from 'framer-motion'
import { useCourseQuery } from '@/queries/useCourse'
import { useCategoryListQuery } from '@/queries/useCategory'
import { useLevelListQuery } from '@/queries/useLevel'
import { pagination } from '@/constants/pagination-config'
import { PaginationDemo } from '@/lib/pagination'
import { useRouter } from 'next/navigation'
import { Icons } from '@/components/ui/icons'

export default function CoursesPage() {
  const [page, setPage] = useState(pagination.PAGE)
  const courseQuery = useCourseQuery(pagination.LIMIT, page)
  const categoryQuery = useCategoryListQuery(pagination.LIMIT, pagination.PAGE)
  const levelQuery = useLevelListQuery(pagination.LIMIT, pagination.PAGE)

  const courses = courseQuery.data?.payload.data.data ?? []
  const data = courseQuery.data?.payload.data.pagination

  const categories = categoryQuery.data?.payload.data.data ?? []
  const levels = levelQuery.data?.payload.data.data ?? []
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCourses, setFilteredCourses] = useState(courses)

  const router = useRouter()

  useEffect(() => {
    if (!courses.length) return
    const filtered = courses.filter((course) => {
      const categoryMatch = selectedCategory === 'All' || course.category.name === selectedCategory
      const priceMatch = course.price >= priceRange[0] && course.price <= priceRange[1]
      const searchMatch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
      return categoryMatch && priceMatch && searchMatch
    })

    setFilteredCourses(filtered)
  }, [selectedCategory, priceRange, searchQuery, courses])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage)
  }, [])
  const handleFilter = () => {
    // Implement your filter logic here
    console.log('Filtering with:', { searchQuery, priceRange, category, level })
    setIsDialogOpen(false)
  }

  return (
    <div className='container mx-auto px-4 py-8 space-y-12 bg-white dark:bg-gray-900'>
      <section className='space-y-4'>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>Explore Courses</h1>
        <p className='text-xl text-gray-700 dark:text-gray-400'>
          Enhance your skills with high-quality courses from top experts
        </p>
      </section>
      <section className='space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md'>
        <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'>
          <div className='w-full md:w-auto flex flex-col sm:flex-row gap-4 items-center'>
            <div className='relative w-full sm:w-96'>
              <Icons.Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400' />
              <Input
                type='search'
                placeholder='Search for courses...'
                className='pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant='outline' className='w-full sm:w-auto'>
                  <Icons.Filter className='mr-2 h-4 w-4' /> Advanced Filters
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle>Filter Courses</DialogTitle>
                </DialogHeader>
                <div className='space-y-4 py-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='category'>Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id='category'>
                        <SelectValue placeholder='Select category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='level'>Level</Label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger id='level'>
                        <SelectValue placeholder='Select level' />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((lvl) => (
                          <SelectItem key={lvl.id} value={lvl.name}>
                            {lvl.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='flex justify-end space-x-2'>
                  <Button variant='outline' onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant={'secondary'} onClick={handleFilter}>
                    Apply
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className='w-full md:w-64 space-y-2'>
            <Label htmlFor='price-range' className='text-sm font-medium text-gray-700 dark:text-gray-300'>
              Price: {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
            </Label>
            <Slider
              id='price-range'
              min={0}
              max={1000000}
              step={50000}
              value={priceRange}
              onValueChange={setPriceRange}
              className='w-full'
            />
          </div>
        </div>
        <AnimatePresence>
          {(searchQuery || priceRange[0] > 0 || priceRange[1] < 1000000 || category || level) && (
            <div>
              <span className='text-sm text-gray-600 dark:text-gray-400 mx-2'>Active filters:</span>
              {searchQuery && (
                <Button variant='secondary' size='sm' onClick={() => setSearchQuery('')}>
                  Search: {searchQuery} <Icons.X className='ml-2 h-3 w-3 mx-2' />
                </Button>
              )}
              {(priceRange[0] > 0 || priceRange[1] < 1000000) && (
                <Button variant='secondary' size='sm' onClick={() => setPriceRange([0, 1000000])}>
                  Price: {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ{' '}
                  <Icons.X className='ml-2 h-3 w-3' />
                </Button>
              )}
              {category && (
                <Button variant='secondary' size='sm' className='m-2' onClick={() => setCategory('')}>
                  Category: {category} <Icons.X className='ml-2 h-3 w-3' />
                </Button>
              )}
              {level && (
                <Button variant='secondary' size='sm' onClick={() => setLevel('')}>
                  Level: {level} <Icons.X className='ml-2 h-3 w-3' />
                </Button>
              )}
            </div>
          )}
        </AnimatePresence>
      </section>

      <section className='space-y-4'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Popular Categories</h2>
        <div className='flex flex-wrap gap-2'>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={category.name === selectedCategory ? 'default' : 'outline'}
              className={
                category.name === selectedCategory
                  ? 'bg-purple-600 hover:bg-purple-700 text-white'
                  : 'text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </section>

      <section className='space-y-6'>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Featured Courses</h2>
          <Button
            variant='link'
            className='text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300'
          >
            View All
          </Button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCourses.slice(0, 3).map((course, index) => (
            <Card
              key={course.id} // Dùng course.id nếu có, tránh lỗi key
              className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader className='p-0'>
                <div className='relative w-full h-48'>
                  <Image
                    src={course.thumbnailUrl && course.thumbnailUrl.trim() !== '' ? course.thumbnailUrl : ''}
                    alt={course.title}
                    fill
                    className='object-cover'
                  />

                  {course.description && (
                    <Badge className='absolute top-2 left-2 bg-purple-500 text-white'>{course.title}</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                  {course.title ?? 'Untitled Course'}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  {course.category?.name ?? 'No Category'}
                </p>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Icons.Users className='h-4 w-4' />
                  <span>{course.instructor?.name ?? 'Unknown Instructor'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Icons.Book className='h-4 w-4' />
                  <span>{course.articlesCount ?? 0} lessons</span>
                  <span>•</span>
                  <Icons.Clock className='h-4 w-4' />
                  <span>{course.videoHours ?? 'Unknown duration'}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-yellow-500 mb-2'>
                  <Icons.Star className='h-4 w-4 fill-current' />
                  <span>{course.rating ?? 'N/A'}</span>
                  <span className='text-gray-600 dark:text-gray-400'>
                    ({course.totalReviews?.toLocaleString() ?? 0} students)
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-100 border-t border-gray-300 dark:border-gray-700'>
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <span className='text-lg font-bold text-gray-900 dark:text-black'>
                      {course.price?.toLocaleString() ?? 0}đ
                    </span>
                    {course.price && (
                      <span className='text-sm text-gray-600 dark:text-gray-400 line-through ml-2'>
                        {course.price.toLocaleString()}đ
                      </span>
                    )}
                  </div>
                  <Link href={pathURL.courses_detail(course.id ?? '')}>
                    {' '}
                    {/* Tránh truyền giá trị cố định */}
                    <Button className='bg-purple-600 hover:bg-purple-700 text-white'>View Details</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>All Courses</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredCourses.map((course, index) => (
            <Card
              key={index}
              className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300'
            >
              <CardHeader className='p-0'>
                <div className='relative w-full h-48'>
                  <Image
                    src={course.thumbnailUrl && course.thumbnailUrl.trim() !== '' ? course.thumbnailUrl : ''}
                    alt={course.title}
                    fill
                    className='object-cover'
                  />

                  <Badge className='absolute top-2 left-2 bg-purple-500 text-white'>{course.title}</Badge>
                </div>
              </CardHeader>
              <CardContent className='p-4'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1'>
                  {course.title}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-2'>{course.category.name}</p>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Icons.Users className='h-4 w-4' />
                  <span>{course.instructor.name}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2'>
                  <Icons.Book className='h-4 w-4' />
                  <span>{course.articlesCount}</span>
                  <span>•</span>
                  <Icons.Clock className='h-4 w-4' />
                  <span>{course.videoHours}</span>
                </div>
                <div className='flex items-center gap-2 text-sm text-yellow-500 mb-2'>
                  <Icons.Star className='h-4 w-4 fill-current' />
                  <span>{course.rating}</span>
                  <span className='text-gray-600 dark:text-gray-400'>
                    ({course.totalReviews.toLocaleString()} students)
                  </span>
                </div>
              </CardContent>
              <CardFooter className='p-4 bg-gray-100 dark:bg-gray-750 border-t border-gray-300 dark:border-gray-700'>
                <div className='flex items-center justify-between w-full'>
                  <div>
                    <span className='text-lg font-bold text-gray-900 dark:text-black'>
                      {course.price.toLocaleString()}đ
                    </span>
                    <span className='text-sm text-gray-600 dark:text-gray-400 line-through ml-2'>
                      {course.price.toLocaleString()}đ
                    </span>
                  </div>
                  <Link href={pathURL.courses_detail(course.id)}>
                    <Button className='bg-purple-600 hover:bg-purple-700 text-white'>View Details</Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        <PaginationDemo
          total={data?.total ?? 0}
          page={data?.page ?? 1}
          limit={data?.limit ?? 2}
          totalPages={data?.totalPages ?? 1}
          onPageChange={handlePageChange}
        />
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Learning Trends</h2>
        <Card className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between mb-4'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Top Categories of Interest</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>Based on enrollments in the last 30 days</p>
              </div>
              <Button
                variant='outline'
                className='text-purple-600 border-purple-600 hover:bg-purple-600/10 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-400/10'
              >
                <Icons.TrendingUp className='mr-2 h-4 w-4' />
                View Detailed Report
              </Button>
            </div>
            <div className='space-y-4'>
              {categories.map((category, index) => (
                <div key={index} className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-700'}`}
                    >
                      {index + 1}
                    </div>
                    <span className='text-gray-900 dark:text-white'>{category.name}</span>
                  </div>
                  <Progress value={100 - index * 15} className='w-1/3' />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className='space-y-6'>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>Subscribe for Updates</h2>
        <Card className='bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'>
          <CardContent className='p-6'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                  Get Notified About New Courses
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Subscribe to receive notifications about new courses and special offers.
                </p>
              </div>
              <div className='flex-1 w-full'>
                <div className='flex w-full items-center space-x-2 '>
                  <Input
                    type='email'
                    placeholder='Enter your email'
                    className='flex-1 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:border-purple-500'
                  />
                  <Button className='bg-purple-600 hover:bg-purple-700 text-white'>Subscribe</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
