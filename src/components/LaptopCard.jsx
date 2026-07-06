import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { CompareContext } from "../context/CompareContext";

// Card riutilizzabile per mostrare le informazioni principali di un laptop e permettere di aggiungerlo ai preferiti o al comparatore.
function LaptopCard({ laptop, showRemoveFavorite = false }) {

    // Accediamo ai metodi del contesto dei preferiti e del comparatore
    const { addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { addToCompare } = useContext(CompareContext);

    /*
      Card riutilizzabile.
    
      Mostra le informazioni principali
      del laptop e permette di:
    
      - vedere il dettaglio
      - aggiungere ai preferiti
      - aggiungere al comparatore
    */

    return (

        <div className="card h-100 shadow-sm">

            <div className="card-body d-flex flex-column">

                <h5 className="card-title">
                    💻 {laptop.title}
                </h5>

                <span className="badge bg-secondary mb-3">
                    {laptop.category}
                </span>

                <div className="mt-auto d-grid gap-2">

                    <Link
                        to={`/laptop/${laptop.id}`}
                        className="btn btn-primary"
                    >
                        👁️ Dettagli
                    </Link>

                    <button
                        className="btn btn-outline-danger"
                        onClick={() => addFavorite(laptop)}
                    >
                        ❤️ Preferiti
                    </button>

                    <button
                        className="btn btn-outline-warning"
                        onClick={() => addToCompare(laptop)}
                    >
                        ⚖️ Confronta
                    </button>

                    {showRemoveFavorite && (
                        <button
                            className="btn btn-danger"
                            onClick={() => removeFavorite(laptop.id)}
                        >
                            ❌ Rimuovi dai preferiti
                        </button>
                    )}

                </div>

            </div>

        </div>
    );

}


export default LaptopCard;