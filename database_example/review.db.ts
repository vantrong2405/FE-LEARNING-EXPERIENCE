export const reviews = [
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
    rating: 5,
    title: 'Khóa học tuyệt vời!',
    content:
      'Tôi đã học được rất nhiều từ khóa học này. Giảng viên giải thích rất rõ ràng và dễ hiểu. Các bài tập thực hành rất hữu ích.',
    date: '2023-07-10',
    status: 'approved',
    helpful: 12,
    unhelpful: 2,
    reported: false
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
    rating: 4,
    title: 'Khóa học hay nhưng hơi khó',
    content:
      'Nội dung khóa học rất hay và cập nhật. Tuy nhiên, một số phần hơi khó đối với người mới bắt đầu. Cần có thêm giải thích chi tiết hơn.',
    date: '2023-07-05',
    status: 'approved',
    helpful: 8,
    unhelpful: 1,
    reported: false
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
    rating: 2,
    title: 'Không như mong đợi',
    content:
      'Khóa học không đi sâu vào phân tích dữ liệu như tôi mong đợi. Nhiều phần quá cơ bản và không có giá trị thực tế.',
    date: '2023-06-28',
    status: 'approved',
    helpful: 3,
    unhelpful: 7,
    reported: true
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
    rating: 5,
    title: 'Tuyệt vời cho người mới bắt đầu',
    content:
      'Khóa học này rất phù hợp cho người mới bắt đầu về UI/UX. Các bài giảng rõ ràng và có nhiều ví dụ thực tế. Tôi đã học được rất nhiều kỹ năng mới.',
    date: '2023-07-02',
    status: 'approved',
    helpful: 15,
    unhelpful: 0,
    reported: false
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
    rating: 3,
    title: 'Khóa học ở mức trung bình',
    content:
      'Khóa học có một số điểm tốt nhưng cũng có nhiều hạn chế. Giảng viên đôi khi giải thích không rõ ràng và thiếu các ví dụ thực tế.',
    date: '2023-06-25',
    status: 'approved',
    helpful: 5,
    unhelpful: 4,
    reported: false
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
    rating: 1,
    title: 'Rất thất vọng',
    content:
      'Nội dung khóa học không như mô tả. Nhiều phần quá cơ bản và không đi vào thực tế. Tôi không khuyên ai học khóa này cả.',
    date: '2023-07-08',
    status: 'pending',
    helpful: 1,
    unhelpful: 9,
    reported: true
  },
  {
    id: 7,
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
    rating: 4,
    title: 'Khóa học rất hữu ích',
    content:
      'Tôi đã học được nhiều kiến thức mới từ khóa học này. Giảng viên giải thích rõ ràng và có nhiều ví dụ thực tế.',
    date: '2023-07-12',
    status: 'pending',
    helpful: 0,
    unhelpful: 0,
    reported: false
  }
]

// Rating distribution data
export const ratingDistribution = [
  { rating: 5, count: reviews.filter((r) => r.rating === 5).length },
  { rating: 4, count: reviews.filter((r) => r.rating === 4).length },
  { rating: 3, count: reviews.filter((r) => r.rating === 3).length },
  { rating: 2, count: reviews.filter((r) => r.rating === 2).length },
  { rating: 1, count: reviews.filter((r) => r.rating === 1).length }
]

// Course rating data
export const courseRatingData = [
  { name: 'JavaScript Cơ Bản', rating: 4.5 },
  { name: 'React Advanced', rating: 4.0 },
  { name: 'Python for Data Science', rating: 2.0 },
  { name: 'UI/UX Design', rating: 5.0 },
  { name: 'Mobile App Development', rating: 3.0 },
  { name: 'Machine Learning', rating: 1.0 }
]

// Monthly reviews data
export const monthlyReviewsData = [
  { month: 'Jan', count: 12 },
  { month: 'Feb', count: 19 },
  { month: 'Mar', count: 25 },
  { month: 'Apr', count: 18 },
  { month: 'May', count: 22 },
  { month: 'Jun', count: 30 },
  { month: 'Jul', count: 15 }
]
