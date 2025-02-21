import z from 'zod'

export const CreatePermissionBody = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000)
})

export type CreatePermissionBodyType = z.TypeOf<typeof CreatePermissionBody>

export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string()
})

export type PermissionType = z.TypeOf<typeof PermissionSchema>

export const PermissionRes = z.object({
  data: PermissionSchema,
  message: z.string()
})

export type PermissionResType = z.TypeOf<typeof PermissionRes>

export const PermissionListRes = z.object({
  data: z.array(PermissionSchema),
  message: z.string()
})

export type PermissionListResType = z.TypeOf<typeof PermissionListRes>

export const UpdatePermissionBody = CreatePermissionBody.partial()
export type UpdatePermissionBodyType = z.TypeOf<typeof UpdatePermissionBody>

export const PermissionParams = z.object({
  id: z.coerce.number()
})
export type PermissionParamsType = z.TypeOf<typeof PermissionParams>
