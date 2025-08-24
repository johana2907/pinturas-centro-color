// src/components/HeroVideo.jsx
import React from "react";

export default function HeroVideo({
  title = "¡Bienvenidos a tu tienda de pinturas!",
  subtitle = "Colores profesionales para transformar tus espacios",
  ctaPrimary = { label: "Ver catálogo", href: "#catalogo" },
  ctaSecondary = { label: "Asesoría gratuita", href: "#contacto" },
}) {
  return (
    <section className="hero-video" id="inicio" aria-label="Bienvenida">
      <video
        className="hero-video__media"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/logo.png"
      >
        <source src="/hero-pintura.mp4" type="video/mp4" />
      </video>

      <div className="hero-video__overlay" />

      {/* 👇 sin 'container' */}
      <div className="hero-video__content">
        <img src="/logo.png" alt="Pinturas Centro Color" className="hero-brand" />
        <h1>{title}</h1>
        <p className="lead">{subtitle}</p>
        <div className="cta">
          <a className="btn primary" href={ctaPrimary.href}>{ctaPrimary.label}</a>
          <a className="btn outline" href={ctaSecondary.href}>{ctaSecondary.label}</a>
        </div>
      </div>
    </section>
  );
}
