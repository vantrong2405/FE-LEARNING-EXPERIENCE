import authApiRequest from '@/apiRequest/auth'
import { useMutation } from '@tanstack/react-query'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.sLogin
  })
}
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.register
  })
}

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.verifyEmail
  })
}
