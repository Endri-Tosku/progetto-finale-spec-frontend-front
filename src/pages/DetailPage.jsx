import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getLaptopById } from "../services/laptopService";
import { FavoritesContext } from "../context/FavoritesContext";
import { CompareContext } from "../context/CompareContext";

/*
  Pagina di dettaglio.

  Recupera l'id dalla URL tramite useParams
  ed esegue una richiesta al backend
  per ottenere tutte le informazioni
  del laptop selezionato.
*/

function DetailPage() {

    /*
      useParams permette di recuperare
      i parametri presenti nella URL.
    */
    const [laptop, setLaptop] = useState(null);
    const { id } = useParams();

    const { addFavorite } = useContext(FavoritesContext);
    const { addToCompare } = useContext(CompareContext);

    useEffect(() => {

        async function fetchLaptop() {

            const data = await getLaptopById(id);
            console.log(data);
            setLaptop(data);
        }

        fetchLaptop();

    }, [id]);

    if (!laptop) {
        return <h2>Caricamento...</h2>;
    }

    return (
        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-body">

                    <h1 className="mp-3">
                        💻{laptop.title}
                    </h1>

                    <span className="badge bg-primary mb-4">
                        {laptop.category}
                    </span>

                    <div className="row">

                        <div className="col-md-6">
                            <p>
                                <strong>Brand:</strong> {laptop.brand}
                            </p>

                            <p>
                                <strong>Processore:</strong> {laptop.processor}</p>
                            <p>
                                <strong>RAM:</strong> {laptop.ram} GB</p>
                            <p>
                                <strong>Storage:</strong> {laptop.storage} GB
                            </p>

                        </div>

                        <div className="col-md-6">

                            <p>
                                <strong>Display:</strong> {laptop.display}"
                            </p>

                            <p>
                                <strong>Prezzo:</strong> € {laptop.price}
                            </p>

                        </div>

                    </div>

                    <hr />

                    <h4>
                        Descrizione:
                    </h4>

                    <p>
                        {laptop.description}
                    </p>

                    <div className="d-flex gap-2 mt-4">

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

                    </div>

                </div>

            </div>

        </div>

    );
}

export default DetailPage;