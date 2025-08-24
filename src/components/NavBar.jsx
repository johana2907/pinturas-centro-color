import React from "react";
import { useCart } from "../context/CartContext";

export default function NavBar({ onOpenCart }) {
  const { count } = useCart();

  return (
    <nav className="navbar">
      <div className="logo">Pinturas Centro Color</div>
      <ul className="menu">
        <li><a href="#catalogo">Catálogo</a></li>
        <li><a href="#contacto">Contacto</a></li>
        <li>
          <button className="cart-btn" onClick={onOpenCart}>
            🛒 Carrito {count > 0 ? `(${count})` : ""}
          </button>
        </li>
      </ul>
    </nav>
  );
}
