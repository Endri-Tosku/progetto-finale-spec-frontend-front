import { createContext, useState, useEffect } from "react";

export const CompareContext = createContext();

// Provider per il contesto di confronto
function CompareProvider({ children }) {
    // Array dei laptop da confrontare.
    const [compareList, setCompareList] = useState(() => {

        /*
          Recupera i laptop salvati
          nel comparatore.
        */
        const savedCompare =
            localStorage.getItem("compareList");

        return savedCompare
            // JSON.parse Serve a trasformare nuovamente la stringa in un array JavaScript.
            ? JSON.parse(savedCompare)
            : [];
    });

    useEffect(() => {

        /*
          Salva il comparatore
          ogni volta che cambia.
        */
        localStorage.setItem(
            "compareList",
            JSON.stringify(compareList)
        );

    }, [compareList]);

    function addToCompare(laptop) {

        // Limite massimo di laptop da confrontare
        if (compareList.length >= 2) {
            alert("Puoi confrontare massimo 2 laptop");
            return;
        }

        // Controllo per evitare duplicati nel comparatore.
        const exists = compareList.some(
            item => item.id === laptop.id
        );

        if (exists) return;

        setCompareList(prev => [
            ...prev,
            laptop
        ]);
    }

    function removeFromCompare(id) {

        setCompareList(prev =>
            prev.filter(
                laptop => laptop.id !== id
            )
        );
    }

    function clearCompare() {
        setCompareList([]);
    }

    return (

        <CompareContext.Provider
            //value è l'oggetto che contiene i dati e le funzioni che vogliamo condividere con i componenti figli
            value={{
                compareList,
                addToCompare,
                removeFromCompare,
                clearCompare
            }}
        >
            {/*homesso {children} perché è necessario per rendere disponibili i componenti figli all'interno del provider*/}
            {children}
        </CompareContext.Provider>

    );
}

export default CompareProvider;