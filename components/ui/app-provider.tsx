'use client'
import { CartProvider } from '@/components/ui/cart-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  )
}
