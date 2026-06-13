import { Link } from "react-router-dom";
import { useContext } from "react";
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

    const { favorites } = useContext(FavoritesContext);
    const { compareList } = useContext(CompareContext);

    return (

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