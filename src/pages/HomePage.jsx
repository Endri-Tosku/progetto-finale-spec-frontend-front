import { useEffect, useState } from "react";
import { getAllLaptops } from "../services/laptopService";
import LaptopCard from "../components/LaptopCard";

function HomePage() {

    /*
      Contiene la lista dei laptop
      ricevuta dal backend.
    */
    const [laptops, setLaptops] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    /*
      Al primo render del componente
      viene eseguita una richiesta al backend
      per ottenere la lista dei laptop.
    */
    useEffect(() => {

        async function fetchLaptops() {

            const data = await getAllLaptops(search, category);

            setLaptops(data);
        }

        fetchLaptops();

    }, [search, category]);

    /*
      Creo una copia dell'array
      per evitare di modificare lo state originale.
    */

    // uso lo spread operator per creare una copia dell'array 
    // se non lo facessi, sort modificherebbe direttamente lo state laptops
    const sortedLaptops = [...laptops].sort((a, b) => {

        if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
        }

        /*
         localeCompare confronta due stringhe
         in ordine alfabetico.
        
         A-Z:
         Apple → Dell → Lenovo
        
         Z-A:
         Lenovo → Dell → Apple
        */

        return b.title.localeCompare(a.title);

    });

    return (


        /*
          Sezione filtri.

          Permette all'utente di:
          - cercare per titolo
          - filtrare per categoria
          - ordinare alfabeticamente

          I risultati vengono aggiornati
          automaticamente al cambiamento
          degli stati.
        */

        <>
            <div className="container py-4">
                <div className="text-center mb-5">

                    <h1 className="display-4 fw-bold">
                        💻 Laptop Comparator
                    </h1>

                    <p className="lead text-muted">

                        Confronta caratteristiche, prezzi e specifiche
                        dei migliori laptop.

                    </p>

                </div>

                <div className="card shadow-sm mb-4">

                    <div className="card-body">
                        <div className="row mb-3">

                            <div className="col-md-4">

                                {/* 
                                   Input controllato.
                                   value:
                                   collega il valore dello stato.
                                   onChange:
                                   aggiorna lo stato ad ogni digitazione.
                                */}
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Cerca un laptop..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <div className="col-md-4">

                                <select
                                    className="form-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >

                                    <option value="">
                                        Tutte le categorie
                                    </option>

                                    <option value="Gaming">
                                        Gaming
                                    </option>

                                    <option value="Business">
                                        Business
                                    </option>

                                    <option value="Student">
                                        Student
                                    </option>

                                    <option value="Ultrabook">
                                        Ultrabook
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-4">

                                <select
                                    className="form-select"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >

                                    <option value="asc">
                                        A-Z
                                    </option>

                                    <option value="desc">
                                        Z-A
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>

                {/*
               Gestione dello stato vuoto.
               Se la ricerca o i filtri
               non restituiscono risultati,
               mostro un messaggio all'utente.
            */}
                {
                    sortedLaptops.length === 0 ? (

                        <div className="alert alert-warning">

                            Nessun laptop trovato.

                        </div>

                    ) : (
                        <div className="row g-3">

                            {
                                sortedLaptops.map((laptop) => (

                                    <div
                                        key={laptop.id}
                                        className="col-md-4"
                                    >
                                        <LaptopCard laptop={laptop} />
                                    </div>

                                ))
                            }

                        </div>
                    )
                }
            </div>
        </>
    );
}

export default HomePage;