'use client'
import { useCartQuery } from '@/queries/useCart'
import { createContext, useContext, useState, useEffect } from 'react'

interface CartContextType {
  cart: any[]
  setCart: (cart: any[]) => void
  selectedItems: string[]
  setSelectedItems: (items: string[]) => void
}

const CartContext = createContext<CartContextType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cartlistQuery = useCartQuery()
  const cartItems = cartlistQuery.data?.payload.data.cartItems || []
  const [cart, setCart] = useState<any[]>([]) // Khởi tạo với mảng rỗng
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  useEffect(() => {
    if (cartItems.length > 0) {
      setCart(cartItems) // Chỉ cập nhật khi có dữ liệu
    }
  }, [cartItems])

  return (
    <CartContext.Provider value={{ cart, setCart, selectedItems, setSelectedItems }}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
