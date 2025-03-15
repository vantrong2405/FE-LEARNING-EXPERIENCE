import authApiRequest from '@/apiRequest/auth'
import { GetMeResType } from '@/schemaValidator/auth.schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout
  })
}

export const useVerifyPasswordMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.verifyEmailPassword
  })
}
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.forgotPassword
  })
}

export const useResetMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.resetPassword
  })
}
export const useGetMeQuery = () => {
  return useQuery({
    queryKey: ['account-profile'],
    queryFn: authApiRequest.getMe
  })
}
export const useUpdateMeMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.updateMe
  })
}

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.changePassword
  })
}
export const useGetListQuery = () => {
  return useQuery({
    queryKey: ['list'],
    queryFn: authApiRequest.list
  })
}

export const useDeleteMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authApiRequest.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user']
      })
    }
  })
}
