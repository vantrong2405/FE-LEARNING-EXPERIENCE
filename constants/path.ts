export const pathURL = {
  home: '/',
  login: '/login',
  register: '/register',
  forgot_password: '/forgot-password',
  dashboard_courses: '/dashboard/courses',
  courses_detail: (id: number) => `/dashboard/courses/${id}`
}
