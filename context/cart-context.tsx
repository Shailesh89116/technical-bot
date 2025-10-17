'use client'

import { CartItem } from '@/types/cart'
import React, { createContext, useContext, useState, useEffect } from 'react'

type CartContextType = {
  items: CartItem[]
  addToCart: (item: CartItem) => Promise<void>
  addToCartAndCheckout: (item: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>
  clearCart: () => Promise<void>
  isLoading: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart')
      const data = await response.json()
      setItems(data.items)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    }
    setIsLoading(false)
  }

  const addToCart = async (newItem: CartItem) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: {id :crypto.randomUUID() ,...newItem}, action: 'add' }),
      })
      const data = await response.json()
      setItems(data.items)
    } catch (error) {
      console.error('Failed to add item to cart:', error)
    }
    setIsLoading(false)
  }

  const addToCartAndCheckout = async (newItem: CartItem) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: newItem, action: 'addAndCheckout' }),
      })
      const data = await response.json()
      setItems(data.items)
      window.location.href = '/checkout'
    } catch (error) {
      console.error('Failed to add item to cart and checkout:', error)
    }
    setIsLoading(false)
  }

  const removeFromCart = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await response.json()
      setItems(data.items)
    } catch (error) {
      console.error('Failed to remove item from cart:', error)
    }
    setIsLoading(false)
  }

  const clearCart = async () => {
    setIsLoading(true)
    try {
      await fetch('/api/cart', { method: 'DELETE' })
      setItems([])
    } catch (error) {
      console.error('Failed to clear cart:', error)
    }
    setIsLoading(false)
  }

  return (
    <CartContext.Provider value={{ items, addToCart, addToCartAndCheckout, removeFromCart, clearCart, isLoading }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
