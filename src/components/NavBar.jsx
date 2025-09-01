import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo-circle.png"; 

export default function NavBar({ onOpenCart }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `neon-btn ${isActive ? "active" : ""}`;

  const handleCart = () => {
    if (typeof onOpenCart === "function") onOpenCart();
  };

  return (
    <header className="navbar nav-elevated">
      <Link to="/" className="brand">
        <span className="logo-wrap">
          <img src={logo} alt="Pinturas Centro Color" className="brand-logo spin" />
        </span>
        <span className="brand-name neon-blue">Pinturas Centro Color</span>
      </Link>

      <button
        className="menu-toggle"
        aria-label="Abrir menú"
        onClick={() => setOpen(v => !v)}
      >
        ☰
      </button>

      <nav className={`menu ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <NavLink className={linkClass} to="/nosotros">Nosotros</NavLink>
        <NavLink className={linkClass} to="/testimonios">Testimonios</NavLink>
        <NavLink className={linkClass} to="/productos">Productos</NavLink>
        <NavLink className={linkClass} to="/contacto">Contacto</NavLink>
        <NavLink className={linkClass} to="/blogs">Blogs</NavLink>

        <button type="button" className="neon-btn outline" onClick={handleCart}>
          🛒 Carrito {count > 0 ? `(${count})` : ""}
        </button>

        <Link to="/tienda" className="neon-btn primary">Compra en línea</Link>
      </nav>
    </header>
  );
}
