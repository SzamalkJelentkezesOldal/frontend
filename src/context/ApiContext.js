import { createContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";

export const ApiContext = createContext("");

export const ApiProvider = ({ children }) => {
  const [szakLista, setSzakLista] = useState([]);

  const getAdat = async (vegpont, callbackfv) => {
    try {
      const response = await myAxios.get(vegpont);
      callbackfv(response.data);
    } catch (err) {
      console.log("Hiba történt az adatok lekérésekor.", err);
    } finally {
    }
  };

  const postAdat = async (vegpont, adat) => {
    try {
      const response = await myAxios.post(vegpont, adat);
      console.log(response);
    } catch (err) {
      console.log("Hiba történt az adatok küldésekor.");
      console.log(err.response.data.errors);
    } finally {
    }
  };

  useEffect(() => {
    getAdat("/szakok", setSzakLista);
  }, []);

  return (
    <ApiContext.Provider value={{ szakLista, postAdat }}>
      {children}
    </ApiContext.Provider>
  );
};
