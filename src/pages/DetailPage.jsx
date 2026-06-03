import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLaptopById } from "../services/laptopService";

function DetailPage() {

    /*
      useParams permette di recuperare
      i parametri presenti nella URL.
    */
    const [laptop, setLaptop] = useState(null);
    const { id } = useParams();

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
        <div className="container mt-5">

            <div className="card">

                <div className="card-body">

                    <h1>{laptop.title}</h1>

                    <p><strong>Categoria:</strong> {laptop.category}</p>

                    <p><strong>Brand:</strong> {laptop.brand}</p>

                    <p><strong>Processore:</strong> {laptop.processor}</p>

                    <p><strong>RAM:</strong> {laptop.ram} GB</p>

                    <p><strong>Storage:</strong> {laptop.storage} GB</p>

                    <p><strong>Display:</strong> {laptop.display}"</p>

                    <p><strong>Prezzo:</strong> € {laptop.price}</p>

                    <p><strong>Descrizione:</strong></p>

                    <p>{laptop.description}</p>

                </div>

            </div>

        </div>
    );
}

export default DetailPage;