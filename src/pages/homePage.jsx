
import HeroVideo from "../components/HeroVideo.jsx";
import CatalogoCategorias from "../components/CatalogoCategorias.jsx";
import ColaboracionIA from "../components/ColaboracionIA.jsx";

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <main className="container">
        <CatalogoCategorias />
        <ColaboracionIA />
      </main>
    </>
  );
}
