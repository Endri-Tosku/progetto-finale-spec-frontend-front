import { createContext, useState } from "react";

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
    const [favorites, setFavorites] = useState([]);

    console.log(favorites);

    /*
      Aggiunge un laptop ai preferiti.
    */
    function addFavorite(laptop) {

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