import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById } from '../services/productsService'

export default function ItemDetailContainer() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)

  useEffect(() => {
    setLoading(true)
    getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Cargando detalle…</p>
  if (!product) return <p>No encontrado. <Link to="/">Volver</Link></p>

  return (
    <article style={{ border: '1px solid #333', borderRadius: 10, padding: 16 }}>
      <h2>{product.name}</h2>
      <p><strong>Precio:</strong> ${product.price.toLocaleString('es-CO')}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>{product.desc}</p>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => alert(`Agregar 1 unidad de "${product.name}"`)}>Agregar al carrito</button>
      </div>
      <div style={{ marginTop: 12 }}>
        <Link to="/">Volver al catálogo</Link>
      </div>
    </article>
  )
}
