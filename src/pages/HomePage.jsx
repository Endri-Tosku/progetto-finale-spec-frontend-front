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

    return (

        <>
            <div className="row mb-4">

                <div className="col-md-6">

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

                <div className="col-md-6">

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