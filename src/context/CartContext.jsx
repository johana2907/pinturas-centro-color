import React, { createContext, useContext, useState, useMemo } from 'react'

const CartCtx = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const count = items.reduce((acc, it) => acc + (it.qty || 1), 0)

  const value = useMemo(() => ({
    items,
    count,
    addToCart: (p) => setItems(prev => [...prev, { ...p, qty: 1 }]),
    removeFromCart: (id) => setItems(prev => prev.filter(p => p.id !== id)),
    clearCart: () => setItems([])
  }), [items])

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
}

export function useCart() {
  const ctx = useContext(CartCtx)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
