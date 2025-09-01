import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProducts } from '../services/productsService'

export default function ItemListContainer({ greeting = 'Catálogo' }) {
  const { categoryId } = useParams()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    setLoading(true)
    getProducts(categoryId)
      .then(setItems)
      .finally(() => setLoading(false))
  }, [categoryId])

  if (loading) return <p>Cargando…</p>

  return (
    <section>
      <h2 style={{ marginBottom: 12 }}>{greeting}{categoryId ? `: ${categoryId}` : ''}</h2>
      {items.length === 0 ? (
        <p>No hay productos para esta categoría.</p>
      ) : (
        <ul style={{ display: 'grid', gap: 12, paddingLeft: 0, listStyle: 'none' }}>
          {items.map(it => (
            <li key={it.id} style={{ border: '1px solid #333', borderRadius: 10, padding: 12 }}>
              <strong>{it.name}</strong>
              <div>Precio: ${it.price.toLocaleString('es-CO')}</div>
              <Link to={`/producto/${it.id}`}>Ver detalle</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
