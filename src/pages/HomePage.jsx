import { useEffect, useState } from "react";
import { getAllLaptops } from "../services/laptopService";
import LaptopCard from "../components/LaptopCard";

function HomePage() {

    // laptops contiene i dati ricevuti dal backend
    const [laptops, setLaptops] = useState([]); // ho usato ([]) invece di null perché voglio inizializzare lo stato come un array vuoto, così posso usare metodi come map senza errori. 
    // search contiene il testo della ricerca
    const [search, setSearch] = useState(""); // ho usato ("") invece di null perché voglio inizializzare lo stato come una stringa vuota, così posso concatenare senza errori.
    // category contiene il filtro della categoria
    const [category, setCategory] = useState(""); // category parte come stringa vuota perché voglio che inizialmente vengano mostrati tutti i laptop, senza filtri.
    // sortOrder contiene il tipo di ordinamento alfabetico
    const [sortOrder, setSortOrder] = useState("asc"); // sortOrder parte come "asc" perché voglio che inizialmente i laptop vengano ordinati in ordine alfabetico crescente.

    /*
      Al primo render del componente
      viene eseguita una richiesta al backend
      per ottenere la lista dei laptop.
    */
    useEffect(() => {

        /* 
        ho messo async function fetchLaptops() e fetchLaptops() 
        perché useEffect non può essere dichiarata come async, 
        quindi creo una funzione asincrona all'interno di useEffect e la richiamo subito dopo.
        */

        /* 
        react non permette di scrivere useEffect(async () => { ... }) 
        perché useEffect deve restituire una funzione di cleanup o nulla
        */

        async function fetchLaptops() {

            // ho messo search e category nelle dipendenze perché voglio che la lista dei laptop venga aggiornata ogni volta che l'utente cambia il testo della ricerca o il filtro della categoria.
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
                                    // value collega il valore dello stato sortOrder
                                    value={sortOrder}
                                    // onChange aggiorna lo stato sortOrder ad ogni selezione
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
                    // sortedLaptops.length === 0 ? è un operatore ternario che verifica se la lunghezza dell'array sortedLaptops è uguale a 0
                    sortedLaptops.length === 0 ? (

                        <div className="alert alert-warning">

                            Nessun laptop trovato.

                        </div>

                    ) : (
                        <div className="row g-3">

                            {
                                // utilizzo map per creare dinamicamente una LaptopCard per ogni laptop ricevuto dal backend
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