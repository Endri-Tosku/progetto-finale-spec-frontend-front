import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import LaptopCard from "../components/LaptopCard";


function FavoritesPage() {
    const { favorites } = useContext(FavoritesContext);
    return (
        <div className="container mt-4">

            <h1>I miei preferiti</h1>

            {
                /* 
                favorites.length === 0
                serve per gestire uno stato vuoto
                */
                favorites.length === 0 ? (

                    <p>
                        Nessun laptop nei preferiti.
                    </p>

                ) : (

                    <div className="row g-3">

                        {
                            favorites.map((laptop) => (

                                <div
                                    key={laptop.id}
                                    className="col-md-4"
                                >
                                    <LaptopCard laptop={laptop} />
                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
}

export default FavoritesPage;