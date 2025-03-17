import cartApiRequest from '@/apiRequest/cart'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCartMutation = () => {
  return useMutation({ mutationFn: cartApiRequest.addCart })
}

export const useCartQuery = () => {
  return useQuery({ queryKey: ['cart'], queryFn: () => cartApiRequest.list() })
}

export const useDeleteCartItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartApiRequest.deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }
  })
}

export const useTotalCartMutation = () => {
  return useMutation({ mutationFn: cartApiRequest.getCartTotal })
}
