import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import FavoritesProvider from "./context/FavoritesContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <FavoritesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FavoritesProvider>
);
