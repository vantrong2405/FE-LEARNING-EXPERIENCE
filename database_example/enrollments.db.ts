export const enrollments = [
  {
    id: 1,
    student: {
      id: 101,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 201,
      title: 'JavaScript Cơ Bản',
      instructor: 'Nguyễn Văn A',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    enrollmentDate: '2023-05-15',
    expiryDate: '2024-05-15',
    progress: 65,
    status: 'active',
    payments: [
      {
        id: 1001,
        amount: 599000,
        date: '2023-05-15',
        method: 'Credit Card',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-14'
  },
  {
    id: 2,
    student: {
      id: 102,
      name: 'Trần Thị B',
      email: 'tranthib@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 202,
      title: 'React Advanced',
      instructor: 'Trần Thị B',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    enrollmentDate: '2023-04-20',
    expiryDate: '2024-04-20',
    progress: 42,
    status: 'active',
    payments: [
      {
        id: 1002,
        amount: 799000,
        date: '2023-04-20',
        method: 'Bank Transfer',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-13'
  },
  {
    id: 3,
    student: {
      id: 103,
      name: 'Lê Văn C',
      email: 'levanc@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 203,
      title: 'Python for Data Science',
      instructor: 'Lê Văn C',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    enrollmentDate: '2023-06-10',
    expiryDate: '2024-06-10',
    progress: 15,
    status: 'inactive',
    payments: [
      {
        id: 1003,
        amount: 899000,
        date: '2023-06-10',
        method: 'E-wallet',
        status: 'completed'
      }
    ],
    lastAccess: '2023-06-25'
  },
  {
    id: 4,
    student: {
      id: 104,
      name: 'Phạm Thị D',
      email: 'phamthid@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 204,
      title: 'UI/UX Design',
      instructor: 'Phạm Thị D',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    enrollmentDate: '2023-03-05',
    expiryDate: '2024-03-05',
    progress: 88,
    status: 'active',
    payments: [
      {
        id: 1004,
        amount: 699000,
        date: '2023-03-05',
        method: 'Credit Card',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-12'
  },
  {
    id: 5,
    student: {
      id: 105,
      name: 'Hoàng Văn E',
      email: 'hoangvane@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 205,
      title: 'Mobile App Development with Flutter',
      instructor: 'Hoàng Văn E',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    enrollmentDate: '2023-02-15',
    expiryDate: '2024-02-15',
    progress: 75,
    status: 'active',
    payments: [
      {
        id: 1005,
        amount: 899000,
        date: '2023-02-15',
        method: 'Bank Transfer',
        status: 'completed'
      }
    ],
    lastAccess: '2023-07-10'
  },
  {
    id: 6,
    student: {
      id: 106,
      name: 'Vũ Thị F',
      email: 'vuthif@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 206,
      title: 'Machine Learning Fundamentals',
      instructor: 'Ngô Thị H',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    enrollmentDate: '2023-07-01',
    expiryDate: '2024-07-01',
    progress: 5,
    status: 'pending',
    payments: [
      {
        id: 1006,
        amount: 999000,
        date: '2023-07-01',
        method: 'E-wallet',
        status: 'pending'
      }
    ],
    lastAccess: 'Never'
  }
]
