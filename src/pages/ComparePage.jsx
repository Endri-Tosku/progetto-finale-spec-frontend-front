import { useContext, useEffect, useState } from "react";
import { CompareContext } from "../context/CompareContext";
import { getLaptopById } from "../services/laptopService";

function ComparePage() {

    const { compareList, removeFromCompare } = useContext(CompareContext);

    const [firstLaptop, setFirstLaptop] = useState(null);
    const [secondLaptop, setSecondLaptop] = useState(null);

    useEffect(() => {

        async function fetchLaptops() {

            if (compareList.length !== 2) return;

            /*
              Promise.all esegue entrambe
              le richieste contemporaneamente.
            */
            const [firstData, secondData] = await Promise.all([
                getLaptopById(compareList[0].id),
                getLaptopById(compareList[1].id)
            ]);

            setFirstLaptop(firstData);
            setSecondLaptop(secondData);
        }

        fetchLaptops();

    }, [compareList]);

    if (compareList.length < 2) {
        return (
            <div className="container mt-4">
                <h1>Comparatore</h1>
                <p>Seleziona due laptop da confrontare.</p>
            </div>
        );
    }

    if (!firstLaptop || !secondLaptop) {
        return <p>Caricamento...</p>;
    }

    return (
        <div className="container mt-4">

            <h1>Comparatore Laptop</h1>

            <div className="row">

                <div className="col-md-6">
                    <h3>{firstLaptop.title}</h3>

                    <p>Brand: {firstLaptop.brand}</p>
                    <p>Processore: {firstLaptop.processor}</p>
                    <p>RAM: {firstLaptop.ram} GB</p>
                    <p>Storage: {firstLaptop.storage} GB</p>
                    <p>Display: {firstLaptop.display}"</p>
                    <p>Prezzo: €{firstLaptop.price}</p>

                    <button className="btn btn-danger" onClick={() => removeFromCompare(firstLaptop.id)}>
                        Rimuovi
                    </button>

                </div>

                <div className="col-md-6">
                    <h3>{secondLaptop.title}</h3>

                    <p>Brand: {secondLaptop.brand}</p>
                    <p>Processore: {secondLaptop.processor}</p>
                    <p>RAM: {secondLaptop.ram} GB</p>
                    <p>Storage: {secondLaptop.storage} GB</p>
                    <p>Display: {secondLaptop.display}"</p>
                    <p>Prezzo: €{secondLaptop.price}</p>

                    <button className="btn btn-danger" onClick={() => removeFromCompare(secondLaptop.id)}>
                        Rimuovi
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ComparePage;