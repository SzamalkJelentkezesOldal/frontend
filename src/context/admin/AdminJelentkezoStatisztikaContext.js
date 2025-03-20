import { createContext, useEffect, useState } from "react";
import { myAxios } from "../MyAxios";

export const AdminJelentkezoStatisztikaContext = createContext("");

export const AdminJelentkezoStatisztikaProvider = ({ children }) => {


  
  useEffect(() => {

  }, []);
  return (
    <AdminJelentkezoStatisztikaContext.Provider
      value={{}}
    >
      {children}
    </AdminJelentkezoStatisztikaContext.Provider>
  );
};
