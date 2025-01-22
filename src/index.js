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
import { SzemelyesAdatokProvider } from "./context/beiratkozas/SzemelyesAdatokContext";
import { BeiratkozasProvider } from "./context/beiratkozas/BeiratkozasContext";
import { DokumentumokProvider } from "./context/beiratkozas/DokumentumokContext";
import { AdminFelveszProvider } from "./context/admin/AdminFelveszContext";
const themeMUI = createTheme({}, huHU);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <BrowserRouter>
        <AuthProvider>
          <JelentkezesProvider>
            <RegisztralasProvider>
              <BelepesProvider>
                <BeiratkozasProvider>
                  <DokumentumokProvider>
                    <SzemelyesAdatokProvider>
                      <ThemeProvider theme={themeMUI}>
                        <App />
                      </ThemeProvider>
                    </SzemelyesAdatokProvider>
                  </DokumentumokProvider>
                </BeiratkozasProvider>
              </BelepesProvider>
            </RegisztralasProvider>
          </JelentkezesProvider>
        </AuthProvider>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
);
