export const pathURL = {
  home: '/',
  login: '/login',
  verify: '/verify-email',
  admin_forgot_password: '/admin/forgot-password',
  register: '/register',
  forgot_password: '/forgot-password',
  dashboard_courses: '/dashboard/courses',
  profile: '/dashboard/profile',
  cart: '/dashboard/cart',
  courses_detail: (id: string) => `/dashboard/courses/${id}`
}
