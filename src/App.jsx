// App.jsx (tal como lo tenías, pero sin el div.container)
import React, { useState } from 'react'
import { CartProvider, useCart } from './context/CartContext.jsx'
import { products } from './data/products.js'
import NavBar from './components/NavBar.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import HeroVideo from './components/HeroVideo.jsx'

function Store() {
  const { addToCart } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <>
      <NavBar onOpenCart={() => setOpen(true)} />

      <HeroVideo
        title="¡Bienvenidos a tu tienda de pinturas!"
        subtitle="Colores profesionales para transformar tus espacios"
        ctaPrimary={{ label: "Ver catálogo", href: "#catalogo" }}
        ctaSecondary={{ label: "Asesoría gratuita", href: "#contacto" }}
      />

      <section id="catalogo" className="products-grid">
        {products.map(p => (
          <ProductCard key={p.id} product={p} onAdd={() => addToCart(p)} />
        ))}
      </section>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <CartProvider>
      <Store />
    </CartProvider>
  )
}
