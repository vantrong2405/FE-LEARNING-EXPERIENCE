export interface Instructor {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface Category {
  id: string
  name: string
  createdAt: string
  updatedAt?: string
}

export interface Course {
  id: string
  title: string
  instructor: Instructor | string
  category: Category
  price: number
  isPublished: boolean
  totalReviews: number
  rating: number
  createdAt: string
  thumbnailUrl: string
}
