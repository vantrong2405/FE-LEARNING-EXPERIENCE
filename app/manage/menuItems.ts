import {
  Home,
  LineChart,
  ShoppingCart,
  Users2,
  Salad,
  Table,
  MonitorSmartphone,
  Presentation,
  Shapes
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    Icon: Home,
    href: '/manage/dashboard'
  },
  {
    title: 'Đơn hàng',
    Icon: ShoppingCart,
    href: '/manage/orders'
  },
  {
    title: 'Khóa học',
    Icon: MonitorSmartphone,
    href: '/manage/courses'
  },
  {
    title: 'Học viên',
    Icon: Users2,
    href: '/manage/accounts'
  },
  {
    title: 'Permission',
    Icon: Presentation,
    href: '/manage/permissions'
  },
  {
    title: 'Role',
    Icon: Shapes,
    href: '/manage/roles'
  }
]

export default menuItems
