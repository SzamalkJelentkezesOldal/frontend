import { createContext } from "react";
import { myAxios } from "../MyAxios";

export const AdminContext = createContext("");

export const AdminProvider = ({ children }) => {
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const ugyintezoFelvesz = async () => {
    const ugyintezoAdatok = {};

    const result = await postUgyintezo(ugyintezoAdatok);
  };

  const postUgyintezo = async (data) => {
    try {
      const response = await myAxios.post("/api/ujJelentkezo", data);
      console.log(response);
      if (response.status === 201) {
      }
      return true;
    } catch (e) {
      console.log(e.response.data.errors);
      return false;
    }
  };

  const login = async ({ ...adat }) => {
    await csrf();
    try {
      const response = await myAxios.post("/api/login", adat);
      console.log(response);
      if (response.status === 201) {
      }
      return true;
    } catch (e) {
      console.log(e.response.adat.errors);
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ login }}>{children}</AdminContext.Provider>
  );
};
