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
      if (err.response && err.response.status === 422) {
        console.log("Validációs hiba történt:");
        console.log(err.response.data.errors);
      } else {
        console.log("Hiba történt:");
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAdat("/api/szakok", setSzakLista);
  }, []);

  return (
    <ApiContext.Provider value={{ szakLista, postAdat }}>
      {children}
    </ApiContext.Provider>
  );
};
