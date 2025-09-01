import React from "react";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, total, removeOne, removeFromCart, clearCart, addToCart } = useCart();

  return (
    <>
      <div className={`drawer ${open ? "open" : ""}`}>
        <header className="drawer-header">
          <h2>Tu carrito</h2>
          <button onClick={onClose} aria-label="Cerrar">✕</button>
        </header>

        <div className="drawer-content">
          {items.length === 0 ? (
            <p className="muted">Aún no tienes productos en el carrito.</p>
          ) : (
            <ul className="cart-list">
              {items.map((i) => (
                <li key={i.id} className="cart-item">
                  <div className="info">
                    <strong>{i.name}</strong>
                    <div className="muted">${(i.price ?? 0).toLocaleString()}</div>
                  </div>

                  <div className="qty">
                    <button onClick={() => removeOne(i.id)} aria-label="Restar">−</button>
                    <span>{i.qty}</span>
                    <button onClick={() => addToCart(i)} aria-label="Sumar">＋</button>
                  </div>

                  <div className="line-total">
                    ${(i.qty * (i.price ?? 0)).toLocaleString()}
                  </div>

                  <button
                    className="link danger"
                    onClick={() => removeFromCart(i.id)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="drawer-footer">
          <div className="total">
            <span>Total:</span>
            <strong>${total.toLocaleString()}</strong>
          </div>
          <div className="actions">
            <button className="btn outline" onClick={clearCart}>Vaciar</button>
            <button
              className="btn primary"
              disabled={items.length === 0}
              onClick={() => alert("¡Simular checkout!")}
            >
              Pagar
            </button>
          </div>
        </footer>
      </div>

      
      {open && <div className="backdrop" onClick={onClose} />}
    </>
  );
}
