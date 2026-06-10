import { createContext, useState } from "react";

export const CompareContext = createContext();

function CompareProvider({ children }) {

    const [compareList, setCompareList] = useState([]);

    function addToCompare(laptop) {

        /*
         Massimo 2 laptop.
        */
        if (compareList.length >= 2) {
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

    return (

        <CompareContext.Provider
            value={{
                compareList,
                addToCompare,
                removeFromCompare
            }}
        >
            {children}
        </CompareContext.Provider>

    );
}

export default CompareProvider;