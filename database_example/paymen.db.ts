export const payments = [
  {
    id: 'PAY-001',
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
    amount: 599000,
    date: '2023-07-15',
    method: 'Credit Card',
    status: 'completed',
    transactionId: 'TXN123456789',
    invoiceNumber: 'INV-2023-001',
    paymentDetails: {
      cardLast4: '4242',
      cardBrand: 'Visa',
      expiryDate: '05/25'
    }
  },
  {
    id: 'PAY-002',
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
    amount: 799000,
    date: '2023-07-14',
    method: 'Bank Transfer',
    status: 'completed',
    transactionId: 'TXN987654321',
    invoiceNumber: 'INV-2023-002',
    paymentDetails: {
      bankName: 'VietcomBank',
      accountLast4: '6789'
    }
  },
  {
    id: 'PAY-003',
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
    amount: 899000,
    date: '2023-07-13',
    method: 'E-wallet',
    status: 'completed',
    transactionId: 'TXN456789123',
    invoiceNumber: 'INV-2023-003',
    paymentDetails: {
      walletProvider: 'MoMo',
      accountEmail: 'levanc@example.com'
    }
  },
  {
    id: 'PAY-004',
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
    amount: 699000,
    date: '2023-07-12',
    method: 'Credit Card',
    status: 'completed',
    transactionId: 'TXN789123456',
    invoiceNumber: 'INV-2023-004',
    paymentDetails: {
      cardLast4: '1234',
      cardBrand: 'Mastercard',
      expiryDate: '09/24'
    }
  },
  {
    id: 'PAY-005',
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
    amount: 899000,
    date: '2023-07-10',
    method: 'Bank Transfer',
    status: 'completed',
    transactionId: 'TXN321654987',
    invoiceNumber: 'INV-2023-005',
    paymentDetails: {
      bankName: 'BIDV',
      accountLast4: '4321'
    }
  },
  {
    id: 'PAY-006',
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
    amount: 999000,
    date: '2023-07-08',
    method: 'E-wallet',
    status: 'pending',
    transactionId: 'TXN654987321',
    invoiceNumber: 'INV-2023-006',
    paymentDetails: {
      walletProvider: 'ZaloPay',
      accountEmail: 'vuthif@example.com'
    }
  },
  {
    id: 'PAY-007',
    student: {
      id: 107,
      name: 'Đặng Văn G',
      email: 'dangvang@example.com',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    course: {
      id: 201,
      title: 'JavaScript Cơ Bản',
      instructor: 'Nguyễn Văn A',
      thumbnail: '/placeholder.svg?height=60&width=80'
    },
    amount: 599000,
    date: '2023-07-05',
    method: 'Credit Card',
    status: 'failed',
    transactionId: 'TXN987321654',
    invoiceNumber: 'INV-2023-007',
    paymentDetails: {
      cardLast4: '5678',
      cardBrand: 'Visa',
      expiryDate: '12/23',
      errorMessage: 'Insufficient funds'
    }
  }
]

// Payment method distribution data
export const paymentMethodData = [
  { name: 'Credit Card', value: payments.filter((p) => p.method === 'Credit Card').length },
  { name: 'Bank Transfer', value: payments.filter((p) => p.method === 'Bank Transfer').length },
  { name: 'E-wallet', value: payments.filter((p) => p.method === 'E-wallet').length }
]

// Payment status distribution data
export const paymentStatusData = [
  { name: 'Completed', value: payments.filter((p) => p.status === 'completed').length },
  { name: 'Pending', value: payments.filter((p) => p.status === 'pending').length },
  { name: 'Failed', value: payments.filter((p) => p.status === 'failed').length }
]

// Daily revenue data
export const dailyRevenueData = [
  { date: '2023-07-05', revenue: 599000 },
  { date: '2023-07-08', revenue: 999000 },
  { date: '2023-07-10', revenue: 899000 },
  { date: '2023-07-12', revenue: 699000 },
  { date: '2023-07-13', revenue: 899000 },
  { date: '2023-07-14', revenue: 799000 },
  { date: '2023-07-15', revenue: 599000 }
]
