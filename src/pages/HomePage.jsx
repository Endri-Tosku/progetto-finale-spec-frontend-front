import { useEffect, useState } from "react";
import { getAllLaptops } from "../services/laptopService";

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

            setLaptops(data);
        }

        fetchLaptops();

    }, []);

    return (
        <div className="container mt-4">

            <h1>Laptop Comparator</h1>

            <ul>
                {
                    laptops.map((laptop) => (
                        <li key={laptop.id}>
                            {laptop.title}
                        </li>
                    ))
                }
            </ul>

        </div>
    );
}

export default HomePage;