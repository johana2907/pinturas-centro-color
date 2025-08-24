import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

// === Reducer ===
function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      // payload: { items: [...] } o estado completo
      // Asegura estructura mínima
      const next = Array.isArray(action.payload?.items)
        ? { ...state, items: action.payload.items }
        : { ...state };
      return next;
    }

    case "ADD": {
      const exists = state.items.some(i => i.id === action.payload.id);
      let items;
      if (exists) {
        items = state.items.map(i =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        );
      } else {
        items = [...state.items, { ...action.payload, qty: 1 }];
      }
      return { ...state, items };
    }

    case "REMOVE_ONE": {
      const items = state.items
        .map(i =>
          i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0);
      return { ...state, items };
    }

    case "REMOVE": {
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload),
      };
    }

    case "CLEAR": {
      return { ...state, items: [] };
    }

    default:
      return state;
  }
}

const initialState = { items: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Cargar del localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart:v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: "INIT", payload: parsed });
      }
    } catch (e) {
      console.error("Error leyendo cart:v1", e);
    }
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    } catch (e) {
      console.error("Error guardando cart:v1", e);
    }
  }, [state]);

  const value = useMemo(() => {
    const count = state.items.reduce((s, i) => s + i.qty, 0);
    const total = state.items.reduce((s, i) => s + i.qty * (i.price ?? 0), 0);

    const addToCart = (product) => dispatch({ type: "ADD", payload: product });
    const removeOne = (id) => dispatch({ type: "REMOVE_ONE", payload: id });
    const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
    const clearCart = () => dispatch({ type: "CLEAR" });

    return { items: state.items, count, total, addToCart, removeOne, removeFromCart, clearCart };
  }, [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
};
