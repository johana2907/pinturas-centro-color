import React from "react";

export default function ProductCard({ product, onAdd }) {
  const { name, price, image, brand } = product;
  return (
    <article className="card">
      {image && <img src={image} alt={name} className="card-img" />}
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        {brand && <p className="muted">{brand}</p>}
        <p className="price">${price?.toLocaleString?.() ?? price}</p>
        <button className="btn" onClick={onAdd}>Agregar</button>
      </div>
    </article>
  );
}
