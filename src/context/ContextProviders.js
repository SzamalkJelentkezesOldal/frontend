import React from "react";
import { useLocation } from "react-router-dom";
import { ApiProvider } from "./ApiContext";
import { JelentkezesProvider } from "./JelentkezesContext";
import { RegisztralasProvider } from "./RegisztralasContext";
import { AuthProvider } from "./AuthContext";
import { BelepesProvider } from "./BelepesContext";
import { SzemelyesAdatokProvider } from "./beiratkozas/SzemelyesAdatokContext";
import { BeiratkozasProvider } from "./beiratkozas/BeiratkozasContext";
import { DokumentumokProvider } from "./beiratkozas/DokumentumokContext";
import { SorrendProvider } from "./beiratkozas/SorrendContext";
import { AdminFelveszProvider } from "./admin/AdminFelveszContext";
import { AdminNyilatkozatProvider } from "./admin/AdminNyilatkozatContext";
import { AdminJelentkezokProvider } from "./admin/AdminJelentkezokContext";
import { AdminUgyintezoProvider } from "./admin/AdminUgyintezoContext";
import { AdminSzakStatisztikaProvider } from "./admin/AdminSzakStatisztikaContext";
import { AdminJelentkezoStatisztikaProvider } from "./admin/AdminJelentkezoStatisztikaContext";
import { AdminSzakFelveszProvider } from "./admin/AdminSzakFelveszContext";
import { AdminSzakProvider } from "./admin/AdminSzakContext";

export const CoreProviders = ({ children }) => {
  return (
    <ApiProvider>
      <AuthProvider>
        <JelentkezesProvider>
          <RegisztralasProvider>
            <BelepesProvider>
              <SorrendProvider>{children}</SorrendProvider>
            </BelepesProvider>
          </RegisztralasProvider>
        </JelentkezesProvider>
      </AuthProvider>
    </ApiProvider>
  );
};

export const BeiratkozasProviders = ({ children }) => {
  const location = useLocation();
  const isBeiratkozasRoute = location.pathname.includes("/beiratkozas");

  if (!isBeiratkozasRoute) {
    return children;
  }

  return (
    <BeiratkozasProvider>
      <DokumentumokProvider>
        <SzemelyesAdatokProvider>{children}</SzemelyesAdatokProvider>
      </DokumentumokProvider>
    </BeiratkozasProvider>
  );
};

export const AdminProviders = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.includes("/admin");

  if (!isAdminRoute) {
    return children;
  }

  return (
    <AdminSzakStatisztikaProvider>
      <AdminJelentkezoStatisztikaProvider>
        <AdminUgyintezoProvider>
          <AdminFelveszProvider>
            <AdminSzakProvider>
              <AdminSzakFelveszProvider>
                <AdminJelentkezokProvider>
                  <AdminNyilatkozatProvider>
                    {children}
                  </AdminNyilatkozatProvider>
                </AdminJelentkezokProvider>
              </AdminSzakFelveszProvider>
            </AdminSzakProvider>
          </AdminFelveszProvider>
        </AdminUgyintezoProvider>
      </AdminJelentkezoStatisztikaProvider>
    </AdminSzakStatisztikaProvider>
  );
};
