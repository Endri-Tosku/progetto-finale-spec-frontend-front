import { createContext, useState, useEffect } from "react";

/*
 Context che renderà disponibili
 i preferiti in tutta l'app.
*/
export const FavoritesContext = createContext();

/* 
createContext()
crea il contesto.

metre Provider 
rende disponibili dati e funzioni a tutti i componenti figli.
*/

function FavoritesProvider({ children }) {

    /*
      Array dei laptop preferiti.
    */
    const [favorites, setFavorites] = useState(() => {

        /*
          Recupera i preferiti salvati.
        */
        const savedFavorites =
            localStorage.getItem("favorites");

        /*
          Se esistono li converte
          da stringa JSON ad array.
        */
        return savedFavorites
            ? JSON.parse(savedFavorites)
            : [];
    });

    useEffect(() => {

        /*
          Salva i preferiti nel browser
          ogni volta che cambiano.
        */
        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
            /* 
            uso JSON.stringify perché
            localStorage può salvare solo stringhe
            */
        );

    }, [favorites]);

    /*
      Aggiunge un laptop ai preferiti.
    */
    function addFavorite(laptop) {

        // Controllo per evitare duplicati nei preferiti.
        const alreadyExists = favorites.some(
            (item) => item.id === laptop.id
        );

        // Se il laptop è già nei preferiti, non lo aggiungo di nuovo.
        if (alreadyExists) return;
        setFavorites((prevFavorites) => [
            ...prevFavorites,
            laptop
        ]);
    }

    /*
      Rimuove un laptop dai preferiti.
    */
    function removeFavorite(id) {

        setFavorites((prevFavorites) =>
            prevFavorites.filter(
                (laptop) => laptop.id !== id
            )
        );
    }

    return (

        <FavoritesContext.Provider
            value={{
                favorites,
                addFavorite,
                removeFavorite
            }}
        >

            {children}

        </FavoritesContext.Provider>


    );
}

export default FavoritesProvider;