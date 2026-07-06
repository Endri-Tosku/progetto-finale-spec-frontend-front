import { createContext, useState, useEffect } from "react";

// Il Context permette di condividere dati tra componenti senza utilizzare il prop drilling
// createContext() serve a creare un nuovo Context che potrà essere condiviso tra più componenti
export const FavoritesContext = createContext();

/* 
createContext()
crea il contesto.

metre Provider 
rende disponibili dati e funzioni a tutti i componenti figli.
*/

function FavoritesProvider({ children }) {


    // Array dei laptop preferiti.
    const [favorites, setFavorites] = useState(() => {


        // Recupera i preferiti salvati.
        const savedFavorites =
            // All'avvio dell'applicazione recupero i preferiti salvati nel browser
            localStorage.getItem("favorites");

        /*
          Se esistono li converte
          da stringa JSON ad array.
        */
        return savedFavorites
            // JSON.parse Serve a trasformare nuovamente la stringa in un array JavaScript.
            ? JSON.parse(savedFavorites)
            : [];
    });

    useEffect(() => {

        // Tramite useEffect salvo automaticamente i preferiti ogni volta che cambiano
        localStorage.setItem(
            // ho messo favorites nelle dipendenze perché voglio che il localStorage venga aggiornato ogni volta che l'array dei preferiti cambia
            "favorites",
            // uso JSON.stringify perchélocalStorage può salvare solo stringhe
            JSON.stringify(favorites)

        );

    }, [favorites]);


    // Aggiunge un laptop ai preferiti.
    function addFavorite(laptop) {

        // Utilizzo some per verificare se il laptop è già presente
        const alreadyExists = favorites.some( // ho utilizzato some invece di find perché voglio solo sapere se esiste o meno, senza dover recuperare l'oggetto
            (item) => item.id === laptop.id
        );

        // Se esiste già, interrompo la funzione evitando duplicati
        if (alreadyExists) return;
        // Se non esiste, aggiungo il laptop ai preferiti
        setFavorites((prevFavorites) => [
            ...prevFavorites,
            laptop
        ]); // non uso push perché voglio creare un nuovo array invece di modificare quello esistente
    }

    // Rimuove un laptop dai preferiti.
    function removeFavorite(id) {

        setFavorites((prevFavorites) =>
            // utilizzo filter per creare un nuovo array eliminando solamente il laptop selezionato.
            prevFavorites.filter(
                (laptop) => laptop.id !== id
            )
        );
    }

    return (

        <FavoritesContext.Provider
            //value è l'oggetto che contiene i dati e le funzioni che vogliamo condividere con i componenti figli
            value={{
                favorites,
                addFavorite,
                removeFavorite
            }}
        >
            {/*homesso {children} perché è necessario per rendere disponibili i componenti figli all'interno del provider*/}
            {children}

        </FavoritesContext.Provider>


    );
}

export default FavoritesProvider;