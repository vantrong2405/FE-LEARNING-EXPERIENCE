export const TokenType = {
  ForgotPasswordToken: 'ForgotPasswordToken',
  AccessToken: 'AccessToken',
  RefreshToken: 'RefreshToken'
} as const

export const Role = {
  User: 'User',
  Instructor: 'Instructor',
  Admin: 'Admin'
} as const

export const RoleValues = [Role.User, Role.Instructor, Role.Admin] as const
