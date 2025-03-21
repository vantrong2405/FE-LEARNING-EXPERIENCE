// Mock data for lessons
export const mockLessons = [
  {
    id: '1',
    title: 'Giới thiệu JavaScript',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 1,
    content: 'Giới thiệu về ngôn ngữ lập trình JavaScript và lịch sử phát triển.',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-16T14:30:00Z',
    status: 'published'
  },
  {
    id: '2',
    title: 'Biến và Kiểu dữ liệu',
    courseId: '1',
    courseName: 'JavaScript Cơ Bản',
    order: 2,
    content: 'Tìm hiểu về biến và các kiểu dữ liệu trong JavaScript.',
    createdAt: '2024-05-15T11:00:00Z',
    updatedAt: '2024-05-16T15:30:00Z',
    status: 'published'
  },
  {
    id: '3',
    title: 'Components và Props',
    courseId: '2',
    courseName: 'React Advanced',
    order: 1,
    content: 'Tìm hiểu về React Components và cách truyền dữ liệu qua Props.',
    createdAt: '2024-05-16T09:00:00Z',
    updatedAt: '2024-05-17T10:30:00Z',
    status: 'draft'
  },
  {
    id: '4',
    title: 'State và Lifecycle',
    courseId: '2',
    courseName: 'React Advanced',
    order: 2,
    content: 'Tìm hiểu về State và vòng đời của một Component trong React.',
    createdAt: '2024-05-16T10:00:00Z',
    updatedAt: '2024-05-17T11:30:00Z',
    status: 'published'
  },
  {
    id: '5',
    title: 'Hooks cơ bản',
    courseId: '2',
    courseName: 'React Advanced',
    order: 3,
    content: 'Tìm hiểu về các Hooks cơ bản trong React như useState, useEffect.',
    createdAt: '2024-05-16T11:00:00Z',
    updatedAt: '2024-05-17T12:30:00Z',
    status: 'published'
  },
  {
    id: '6',
    title: 'Giới thiệu Python',
    courseId: '3',
    courseName: 'Python for Data Science',
    order: 1,
    content: 'Giới thiệu về ngôn ngữ lập trình Python và ứng dụng trong Data Science.',
    createdAt: '2024-05-17T09:00:00Z',
    updatedAt: '2024-05-18T10:30:00Z',
    status: 'published'
  },
  {
    id: '7',
    title: 'NumPy và Pandas',
    courseId: '3',
    courseName: 'Python for Data Science',
    order: 2,
    content: 'Tìm hiểu về thư viện NumPy và Pandas trong Python.',
    createdAt: '2024-05-17T10:00:00Z',
    updatedAt: '2024-05-18T11:30:00Z',
    status: 'draft'
  }
]

// Mock data for courses
export const mockCourses = [
  { id: '1', name: 'JavaScript Cơ Bản' },
  { id: '2', name: 'React Advanced' },
  { id: '3', name: 'Python for Data Science' },
  { id: '4', name: 'UI/UX Design' }
]
