// File: user.ts
export interface User {
  id: string
  name: string
  email: string
  role: string
  verify: number
  avatarUrl?: string
  bio?: string
  lastLogin?: string
  joined?: string
  username?: string
  gender?: string
  courses?: CourseSummary[]
}

export interface CourseSummary {
  id: string
  title: string
  description?: string
}

// File: student.ts
export interface Student {
  id: string
  name: string
  email: string
  avatar: string
}

// File: enrollment.ts

// File: payment.ts

// File: review.ts

// File: faq.ts

// File: lesson.ts
