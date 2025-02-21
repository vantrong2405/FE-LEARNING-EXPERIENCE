import z from 'zod'

export const CreateRoleBody = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000)
})

export type CreateRoleBodyType = z.TypeOf<typeof CreateRoleBody>

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string()
})

export type RoleType = z.TypeOf<typeof RoleSchema>

export const RoleRes = z.object({
  data: RoleSchema,
  message: z.string()
})

export type RoleResType = z.TypeOf<typeof RoleRes>

export const RoleListRes = z.object({
  data: z.array(RoleSchema),
  message: z.string()
})

export type RoleListResType = z.TypeOf<typeof RoleListRes>

export const UpdateRoleBody = CreateRoleBody.partial()
export type UpdateRoleBodyType = z.TypeOf<typeof UpdateRoleBody>

export const RoleParams = z.object({
  id: z.coerce.number()
})
export type RoleParamsType = z.TypeOf<typeof RoleParams>
