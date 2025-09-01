
export default function HeroVideo() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero-pintura.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay">
        <div>
          <h1 className="hero-title">Bienvenido a tu tienda de pinturas</h1>
          <p className="hero-subtitle">De paredes simples a ambientes inolvidables</p>
        </div>
      </div>
    </section>
  );
}
