export interface CartItem {
  cartId: string
  course: {
    id: string
    description: string
    instructor: {
      avatarUrl: string
      name: string
    }
    thumbnailUrl: string
    title: string
  }
  id: string
  courseId: string
  createdAt: string
  updatedAt: string
  price: number
  quantity: number
}
