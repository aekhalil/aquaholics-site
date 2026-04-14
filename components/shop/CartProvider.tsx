'use client'

import * as React from 'react'

export interface CartItem {
  id: string
  name: string
  price: number // cents
  quantity: number
  image?: string
  slug: string
  stripePriceId?: string
}

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  total: number // cents
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = React.createContext<CartContextValue | null>(null)

const CART_KEY = 'aquaholic_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>([])

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      if (stored) setItems(JSON.parse(stored))
    } catch {
      // ignore parse errors
    }
  }, [])

  // Persist to localStorage on change
  React.useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id)
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }

  const clearCart = () => setItems([])

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, itemCount, total, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = React.useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
