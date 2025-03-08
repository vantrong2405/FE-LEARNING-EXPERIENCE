import z from 'zod'

export const AccountSchema = z.object({
  id: z.number(),
  username: z.string().min(2).max(100),
  name: z.string().min(2).max(256),
  email: z.string().email(),
  password: z.string().min(6).max(100), // Mật khẩu thường được mã hóa trước khi lưu
  avatar_url: z.string().url().nullable(),
  gender: z.enum(['Male', 'Female', 'Other']).nullable(),
  role_id: z.number(),
  email_verified: z.boolean().default(false),
  email_verify_token: z.string().nullable(),
  forget_password_token: z.string().nullable(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date()
})

export type AccountType = z.TypeOf<typeof AccountSchema>

export const AccountListRes = z.object({
  data: z.array(AccountSchema),
  message: z.string()
})

export type AccountListResType = z.TypeOf<typeof AccountListRes>

export const AccountRes = z
  .object({
    data: AccountSchema,
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const CreateEmployeeAccountBody = z
  .object({
    username: z.string().min(2).max(100),
    name: z.string().trim().min(2).max(256),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100),
    avatar_url: z.string().url().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    role_id: z.number().default(2) // Giả sử 2 là role nhân viên
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu không khớp',
        path: ['confirmPassword']
      })
    }
  })

export type CreateEmployeeAccountBodyType = z.TypeOf<typeof CreateEmployeeAccountBody>

export const UpdateEmployeeAccountBody = z
  .object({
    username: z.string().min(2).max(100).optional(),
    name: z.string().trim().min(2).max(256).optional(),
    email: z.string().email().optional(),
    avatar_url: z.string().url().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional(),
    role_id: z.number().optional(),
    is_active: z.boolean().optional(),
    changePassword: z.boolean().optional(),
    password: z.string().min(6).max(100).optional(),
    confirmPassword: z.string().min(6).max(100).optional()
  })
  .strict()
  .superRefine(({ confirmPassword, password, changePassword }, ctx) => {
    if (changePassword) {
      if (!password || !confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: 'Hãy nhập mật khẩu mới và xác nhận mật khẩu mới',
          path: ['changePassword']
        })
      } else if (confirmPassword !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Mật khẩu không khớp',
          path: ['confirmPassword']
        })
      }
    }
  })

export type UpdateEmployeeAccountBodyType = z.TypeOf<typeof UpdateEmployeeAccountBody>

export const UpdateMeBody = z
  .object({
    username: z.string().min(2).max(100).optional(),
    name: z.string().trim().min(2).max(256).optional(),
    avatar_url: z.string().url().optional(),
    gender: z.enum(['Male', 'Female', 'Other']).optional()
  })
  .strict()

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>

export const ChangePasswordBody = z
  .object({
    oldPassword: z.string().min(6).max(100),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(100)
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Mật khẩu mới không khớp',
        path: ['confirmPassword']
      })
    }
  })

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>

export const AccountIdParam = z.object({
  id: z.coerce.number()
})

export type AccountIdParamType = z.TypeOf<typeof AccountIdParam>
