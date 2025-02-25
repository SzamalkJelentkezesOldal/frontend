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
import { SorrendProvider } from "./context/beiratkozas/SorrendContext";
import { AdminNyilatkozatProvider } from "./context/admin/AdminNyilatkozatContext";
import { AdminJelentkezokProvider } from "./context/admin/AdminJelentkezokContext";
import { AdminUgyintezoProvider } from "./context/admin/AdminUgyintezoContext";
import { AdminSzakStatisztikaProvider } from "./context/admin/AdminSzakStatisztikaContext";


const themeMUI = createTheme({}, huHU);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <BrowserRouter>
        <BeiratkozasProvider>
          <SorrendProvider>
            <AuthProvider>
              <AdminSzakStatisztikaProvider>
                <AdminUgyintezoProvider>
                  <AdminFelveszProvider>
                    <AdminJelentkezokProvider>
                      <AdminNyilatkozatProvider>
                        <JelentkezesProvider>
                          <RegisztralasProvider>
                            <BelepesProvider>
                              <DokumentumokProvider>
                                <SzemelyesAdatokProvider>
                                  <ThemeProvider theme={themeMUI}>
                                    <App />
                                  </ThemeProvider>
                                </SzemelyesAdatokProvider>
                              </DokumentumokProvider>
                            </BelepesProvider>
                          </RegisztralasProvider>
                        </JelentkezesProvider>
                      </AdminNyilatkozatProvider>
                    </AdminJelentkezokProvider>
                  </AdminFelveszProvider>
                </AdminUgyintezoProvider>
              </AdminSzakStatisztikaProvider>
            </AuthProvider>
          </SorrendProvider>
        </BeiratkozasProvider>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
);
