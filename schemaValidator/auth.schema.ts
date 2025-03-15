import z from 'zod'

export const LoginBody = z
  .object({
    email: z
      .string()
      .min(5, 'Email must be at least 5 characters long')
      .max(255, 'Email must be at most 255 characters long')
      .email('Invalid email format'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const RegisterBody = z
  .object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters long')
      .max(100, 'Name must be at most 100 characters long'),

    email: z
      .string()
      .min(5, 'Email must be at least 5 characters long')
      .max(255, 'Email must be at most 255 characters long')
      .email('Invalid email format'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    confirmPassword: z
      .string()
      .min(8, 'Confirm Password must be at least 8 characters long')
      .max(100, 'Confirm Password must be at most 100 characters long'),

    dateOfBirth: z
      .date({ required_error: 'Date of birth is required' })
      .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
        message: 'Invalid date format'
      }),

    role: z.string({ required_error: 'Role is required' }),
    verify: z.number({ required_error: 'Role is required' }).optional()
  })

  .strict()

export type RegisterBodyType = z.infer<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    user: z.object({
      id: z.string(),
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      dateOfBirth: z.date(),
      role: z.number(),
      createdAt: z.string()
    }),
    message: z.string()
  }),
  statusCode: z.number()
})

export type RegisterRes = z.TypeOf<typeof RegisterRes>

export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string(),
  statusCode: z.number()
})

export type LoginResType = z.TypeOf<typeof LoginRes>

const verifySchema = z.object({
  email_verify_token: z.string()
})
export type VerifyBodyType = z.TypeOf<typeof verifySchema>

export const VerifyEmailRes = z.object({
  message: z.string()
})
export type VerifyResType = z.TypeOf<typeof VerifyEmailRes>

export const RefreshTokenBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>

export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string()
  }),
  message: z.string()
})

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>

export const LogoutBody = z
  .object({
    refreshToken: z.string()
  })
  .strict()

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>

export const ForgotPasswordBody = z
  .object({
    email: z.string().email()
  })
  .strict()

export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>

export const VerifyEmailPasswordBody = z
  .object({
    forgot_password_token: z.string()
  })
  .strict()

export type VerifyEmailPasswordBodyType = z.TypeOf<typeof VerifyEmailPasswordBody>

export const ResetPasswordBody = z.object({
  forgot_password_token: z.string(),
  new_password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirm_password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
})

export type ResetPasswordBodyType = z.TypeOf<typeof ResetPasswordBody>

export const GetMeRes = z.object({
  statusCode: z.number(),
  data: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    username: z.string(),
    gender: z.string().nullable(),
    dateOfBirth: z.string(),
    bio: z.string().nullable(),
    avatarUrl: z.string().nullable(),
    courses: z.array(z.unknown()),
    reviews: z.array(z.unknown()),
    role: z.string(),
    verify: z.number(),
    createdAt: z.string(),
    updatedAt: z.string()
  })
})

export type GetMeResType = z.infer<typeof GetMeRes>

export const MeBody = z
  .object({
    name: z.string().min(2),
    email: z.string().optional(),
    username: z.string().optional(),
    gender: z.string({ required_error: 'gender is required' }),
    bio: z.string().nullable().optional(),
    role: z.string({ required_error: 'Role is required' }).optional(),
    avatarUrl: z.string().optional()
  })
  .strict()

export type MeBodyType = z.TypeOf<typeof MeBody>

export const ChangePasswordBody = z
  .object({
    current_password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    new_password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

    confirm_password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(100, 'Password must be at most 100 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
  })
  .strict()

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>

const ReviewSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

const CourseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  price: z.number().positive(),
  thumbnailUrl: z.string().url(),
  bannerUrl: z.string().url(),
  instructorId: z.string().uuid(),
  categoryId: z.string().uuid(),
  isPublished: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  rating: z.number().min(0).max(5),
  totalReviews: z.number().nonnegative(),
  moneyBackGuarantee: z.boolean(),
  videoHours: z.number().positive(),
  articlesCount: z.number().nonnegative(),
  downloadableResources: z.number().nonnegative(),
  lifetimeAccess: z.boolean(),
  certificate: z.boolean(),
  courseOverview: z.string(),
  learningObjectives: z.string(),
  courseFeatures: z.string(),
  requirements: z.string(),
  levelId: z.string().uuid()
})

const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  username: z.string(),
  gender: z.enum(['Male', 'Female', 'Other']),
  dateOfBirth: z.string().datetime(),
  bio: z.string(),
  avatarUrl: z.string().url(),
  courses: z.array(CourseSchema),
  reviews: z.array(ReviewSchema),
  role: z.string(),
  verify: z.number().min(0).max(1)
})

const DataSchema = z.object({
  data: z.array(UserSchema)
})
export type GetListMeResType = z.TypeOf<typeof DataSchema>
