import { createContext, useState, useEffect } from "react";

export const CompareContext = createContext();

function CompareProvider({ children }) {

    const [compareList, setCompareList] = useState(() => {

        /*
          Recupera i laptop salvati
          nel comparatore.
        */
        const savedCompare =
            localStorage.getItem("compareList");

        return savedCompare
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

        /*
         Massimo 2 laptop.
        */
        if (compareList.length >= 2) {
            alert("Puoi confrontare massimo 2 laptop");
            return;
        }

        /*
         Evita duplicati.
        */
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
            value={{
                compareList,
                addToCompare,
                removeFromCompare,
                clearCompare
            }}
        >
            {children}
        </CompareContext.Provider>

    );
}

export default CompareProvider;