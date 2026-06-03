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

    /*
      Al primo render del componente
      viene eseguita una richiesta al backend
      per ottenere la lista dei laptop.
    */
    useEffect(() => {

        async function fetchLaptops() {

            const data = await getAllLaptops(search);

            setLaptops(data);
        }

        fetchLaptops();

    }, [search]);

    return (

        <>
            <div className="mb-4">
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

            <div className="row g-3">

                {
                    laptops.map((laptop) => (

                        <div
                            key={laptop.id}
                            className="col-md-4"
                        >
                            <LaptopCard laptop={laptop} />
                        </div>

                    ))
                }

            </div>
        </>
    );
}

export default HomePage;