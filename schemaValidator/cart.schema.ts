import { z } from 'zod'

const cartSchema = z.object({ courseId: z.string() })
export type CartBodyType = z.TypeOf<typeof cartSchema>

export const InstructorSchema = z.object({ id: z.string().uuid(), name: z.string(), avatarUrl: z.string().url() })

export const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  thumbnailUrl: z.string().url(),
  price: z.number(),
  instructor: InstructorSchema
})

export const CartItemSchema = z.object({
  id: z.string().uuid(),
  cartId: z.string().uuid(),
  courseId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  course: CourseSchema
})

export const CartResponseSchema = z.object({ data: CartItemSchema, statusCode: z.literal(201) })

export type CartResType = z.infer<typeof CartResponseSchema>

export const CartSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  cartItems: z.array(CartItemSchema)
})

export const CartItemTypeSchema = z.object({ data: CartSchema, statusCode: z.literal(200) })

export type CartItemResType = z.infer<typeof CartItemTypeSchema>

export const TotalCartBodySchema = z.object({ courseIds: z.array(z.string().uuid()) })

export type TotalCartBodyType = z.infer<typeof TotalCartBodySchema>

export const CartTotalSchema = z.object({ data: z.object({ total: z.number() }), statusCode: z.number() })

export type CartTotalResType = z.infer<typeof CartTotalSchema>
