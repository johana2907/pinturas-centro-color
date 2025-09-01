import { Link } from "react-router-dom";

export default function ColaboracionIA() {
  return (
    <section className="ia-section">
      <div className="ia-box">
        <h2 className="ia-title">
          Te ayudamos a abrir tu mente y obtener mejores resultados en tus proyectos
        </h2>
        <p className="ia-subtitle">
          Con nuestra llave colaboradora <strong>IA</strong>
        </p>
        <Link to="/ia" className="neon-btn primary">
          Descubrir Diseños con IA
        </Link>
      </div>
    </section>
  );
}
