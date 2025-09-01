import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <section style={{ padding: 24, textAlign: "center" }}>
      <h1>404</h1>
      <p>Página no encontrada</p>
      <Link to="/">Volver al inicio</Link>
    </section>
  )
}
