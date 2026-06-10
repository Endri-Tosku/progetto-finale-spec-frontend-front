import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FavoritesProvider from "./context/FavoritesContext";
import CompareProvider from "./context/CompareContext";

ReactDOM.createRoot(document.getElementById("root")).render(

  <FavoritesProvider>

    <CompareProvider>

      <React.StrictMode>

        <App />

      </React.StrictMode>

    </CompareProvider>

  </FavoritesProvider>

);
