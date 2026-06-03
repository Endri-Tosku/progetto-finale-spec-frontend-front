import { useEffect, useState } from "react";
import { getAllLaptops } from "../services/laptopService";
import LaptopCard from "../components/LaptopCard";

function HomePage() {

    /*
      Contiene la lista dei laptop
      ricevuta dal backend.
    */
    const [laptops, setLaptops] = useState([]);

    /*
      Al primo render del componente
      viene eseguita una richiesta al backend
      per ottenere la lista dei laptop.
    */
    useEffect(() => {

        async function fetchLaptops() {

            const data = await getAllLaptops();

            console.log("DATI API:", data);

            setLaptops(data);
        }

        fetchLaptops();

    }, []);

    return (
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
    );
}

export default HomePage;