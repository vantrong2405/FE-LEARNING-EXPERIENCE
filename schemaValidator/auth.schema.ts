import z from 'zod'

export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
  })
  .strict()

export type LoginBodyType = z.TypeOf<typeof LoginBody>

export const RegisterBody = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    dateOfBirth: z.date(),
    confirmPassword: z.string().min(6).max(100),
    roleId: z.number()
  })
  .strict()

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>

export const RegisterRes = z.object({
  data: z.object({
    user: z.object({
      id: z.number(),
      name: z.string(),
      username: z.string(),
      email: z.string().email(),
      dateOfBirth: z.date(), // hoặc z.date() nếu bạn muốn chuyển đổi
      roleId: z.number(),
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
