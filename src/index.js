import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ApiProvider } from "./context/ApiContext";
import { JelentkezesProvider } from "./context/JelentkezesContext";
import { BrowserRouter } from "react-router-dom";
import { RegisztralasProvider } from "./context/RegisztralasContext";
import { AuthProvider } from "./context/AuthContext";
import { BelepesProvider } from "./context/BelepesContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { huHU } from "@mui/material/locale";
const themeMUI = createTheme({}, huHU);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <AuthProvider>
        <JelentkezesProvider>
          <RegisztralasProvider>
            <BelepesProvider>
              <BrowserRouter>
                <ThemeProvider theme={themeMUI}>
                  <App />
                </ThemeProvider>
              </BrowserRouter>
            </BelepesProvider>
          </RegisztralasProvider>
        </JelentkezesProvider>
      </AuthProvider>
    </ApiProvider>
  </React.StrictMode>
);
