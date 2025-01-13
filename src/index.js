import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ApiProvider } from "./context/ApiContext";
import { JelentkezesProvider } from "./context/JelentkezesContext";
import { BrowserRouter } from "react-router-dom";
import { RegisztralasProvider } from "./context/RegisztralasContext";
import { AuthProvider } from "./context/AuthContext";
import { BelepesProvider } from "./context/BelepesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <AuthProvider>
        <JelentkezesProvider>
          <RegisztralasProvider>
            <BelepesProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </BelepesProvider>
          </RegisztralasProvider>
        </JelentkezesProvider>
      </AuthProvider>
    </ApiProvider>
  </React.StrictMode>
);
