import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ComparePage from "./pages/ComparePage";
import FavoritesPage from "./pages/FavoritesPage";
import Navbar from "./components/Navbar";

function App() {

    /*
      Definizione delle rotte principali
      dell'applicazione tramite React Router.
    */
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<HomePage />} />

                <Route path="/laptop/:id" element={<DetailPage />} />

                <Route path="/compare" element={<ComparePage />} />

                <Route path="/favorites" element={<FavoritesPage />} />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
