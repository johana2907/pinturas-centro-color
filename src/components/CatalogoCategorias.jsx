import { Link } from "react-router-dom";

import diColoreImg from "../assets/pinturas-di-colore-principal.jpg";
import accesoriosImg from "../assets/escalera-cafe.jpg";
import davinciImg from "../assets/pinturas-davinci.jpg";

export default function CatalogoCategorias() {
  const categorias = [
    {
      id: "di-colore",
      titulo: "Pinturas Di Colore",
      desc: "Colores exclusivos y modernos",
      link: "/categoria/di-colore",
      img: diColoreImg,
    },
    {
      id: "paredes",
      titulo: "Todo para tus pinturas y paredes",
      desc: "Rodillos, brochas y accesorios",
      link: "/categoria/paredes",
      img: accesoriosImg,
    },
    {
      id: "davinci",
      titulo: "Pinturas DaVinci",
      desc: "Acabados premium y artísticos",
      link: "/categoria/davinci",
      img: davinciImg,
    },
  ];

  return (
    <section className="catalogo-grid">
      {categorias.map((cat) => (
        <article key={cat.id} className="catalogo-card">
          <figure className="catalogo-figure">
            <img src={cat.img} alt={cat.titulo} className="catalogo-img" />
          </figure>
          <div className="catalogo-content">
            <h2 className="catalogo-title">{cat.titulo}</h2>
            <p className="catalogo-desc">{cat.desc}</p>
            <Link to={cat.link} className="neon-btn primary">
              Ver productos
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}
