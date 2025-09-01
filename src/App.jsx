import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ItemListContainer from "./containers/ItemListContainer.jsx";
import ItemDetailContainer from "./containers/ItemDetailContainer.jsx";
import NotFound from "./components/NotFound.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categoria/:categoryId" element={<ItemListContainer greeting="Productos" />} />
        <Route path="/producto/:id" element={<ItemDetailContainer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
