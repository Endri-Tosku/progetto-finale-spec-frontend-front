// importo i moduli necessari da React e React Router
import { Link } from "react-router-dom";
import { useContext } from "react";
// importo i contesti per i preferiti e il comparatore
import { FavoritesContext } from "../context/FavoritesContext";
import { CompareContext } from "../context/CompareContext";

/*
  Navbar globale.

  Mostra:
  - link alla home
  - numero dei preferiti
  - numero degli elementi nel comparatore

  I contatori vengono aggiornati
  automaticamente tramite Context API.
*/

function Navbar() {

    // Recupero i contatori dei preferiti e del comparatore dai rispettivi contesti
    const { favorites } = useContext(FavoritesContext);
    const { compareList } = useContext(CompareContext);

    return (

        // Navbar principale con link alla home, al comparatore e ai preferiti
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">

            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold"
                >
                    💻 Laptop Comparator
                </Link>

                <div className="d-flex gap-2">

                    <Link
                        to="/compare"
                        className="btn btn-outline-warning"
                    >
                        ⚖️ Compare ({compareList.length})
                    </Link>

                    <Link
                        to="/favorites"
                        className="btn btn-outline-light"
                    >
                        ❤️ {favorites.length}
                    </Link>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;