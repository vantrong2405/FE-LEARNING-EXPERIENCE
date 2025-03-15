import http from '@/lib/http'
import {
  CartBodyType,
  CartItemResType,
  CartResType,
  CartTotalResType,
  TotalCartBodyType
} from '@/schemaValidator/cart.schema'

const cartApiRequest = {
  list: () => http.get<CartItemResType>(`cart`, { next: { tags: ['course'] } }),
  addCart: (body: CartBodyType) => http.post<CartResType>(`cart`, body),
  deleteCartItem: (id: string) => http.delete(`cart/${id}`),
  getCartTotal: (body: TotalCartBodyType) => http.post<CartTotalResType>('/cart/total', body)
}

export default cartApiRequest
