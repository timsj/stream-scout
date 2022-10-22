import React from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";

import "./index.css";
import App from "./App";
import { AppProvider } from "./context/appContext";

// start webpack CSS icon url fix
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
// end webpack CSS icon url fix

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
