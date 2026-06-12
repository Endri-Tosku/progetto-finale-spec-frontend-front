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

            <table className="table table-bordered table-striped mt-4">

                <thead>

                    <tr>
                        <th>Nome</th>
                        <th>{firstLaptop.title}</th>
                        <th>{secondLaptop.title}</th>
                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>Categoria</td>
                        <td>{firstLaptop.category}</td>
                        <td>{secondLaptop.category}</td>
                    </tr>

                    <tr>
                        <td>Brand</td>
                        <td>{firstLaptop.brand}</td>
                        <td>{secondLaptop.brand}</td>
                    </tr>

                    <tr>
                        <td>Processore</td>
                        <td>{firstLaptop.processor}</td>
                        <td>{secondLaptop.processor}</td>
                    </tr>

                    <tr>
                        <td>RAM</td>
                        <td>{firstLaptop.ram} GB</td>
                        <td>{secondLaptop.ram} GB</td>
                    </tr>

                    <tr>
                        <td>Storage</td>
                        <td>{firstLaptop.storage} GB</td>
                        <td>{secondLaptop.storage} GB</td>
                    </tr>

                    <tr>
                        <td>Display</td>
                        <td>{firstLaptop.display}"</td>
                        <td>{secondLaptop.display}"</td>
                    </tr>

                    <tr>
                        <td>Prezzo</td>
                        <td>€{firstLaptop.price}</td>
                        <td>€{secondLaptop.price}</td>
                    </tr>

                </tbody>

            </table>

            <div className="d-flex gap-2">

                <button
                    className="btn btn-danger"
                    onClick={() => removeFromCompare(firstLaptop.id)}
                >
                    Rimuovi {firstLaptop.title}
                </button>

                <button
                    className="btn btn-danger"
                    onClick={() => removeFromCompare(secondLaptop.id)}
                >
                    Rimuovi {secondLaptop.title}
                </button>

            </div>
        </div>
    );
}

export default ComparePage;