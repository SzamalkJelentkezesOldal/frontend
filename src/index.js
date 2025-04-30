import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { huHU } from "@mui/material/locale";
import {
  CoreProviders,
  BeiratkozasProviders,
  AdminProviders,
} from "./context/ContextProviders";

const themeMUI = createTheme(
  {
    palette: {
      primary: {
        main: "#00848b",
      },
      secondary: {
        main: "#00848b",
      },
    },
  },
  huHU
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CoreProviders>
        <BeiratkozasProviders>
          <AdminProviders>
            <ThemeProvider theme={themeMUI}>
              <App />
            </ThemeProvider>
          </AdminProviders>
        </BeiratkozasProviders>
      </CoreProviders>
    </BrowserRouter>
  </React.StrictMode>
);
