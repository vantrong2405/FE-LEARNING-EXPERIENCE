export const pathURL = {
  home: '/',
  login: '/login',
  verify: '/verify-email',
  admin_forgot_password: '/admin/forgot-password',
  register: '/register',
  forgot_password: '/forgot-password',
  dashboard_courses: '/dashboard/courses',
  courses_detail: (id: number) => `/dashboard/courses/${id}`
}
