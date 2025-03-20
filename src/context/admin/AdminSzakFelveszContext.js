import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "../MyAxios";
import { ApiContext } from "../ApiContext";

export const AdminSzakFelveszContext = createContext("");

export const AdminSzakFelveszProvider = ({ children }) => {
  const { setSzakLista } = useContext(ApiContext);

  const felveszSchema = z.object({
    master: z.boolean(),
  });

  const szakFelvesz = async () => {
    const adatok = getValues(["id", "elnevezes", "portfolio", "nappali"]);

    const szakAdatok = {
      id: adatok[0],
      elnevezes: adatok[1],
      portfolio: adatok[2],
      nappali: adatok[3],
    };

    const result = await postUgyintezo(ugyintezoAdatok);
    if (result) {
      reset();
    }
  };

  /*const postSzak = async (data) => {
    try {
      const response = await myAxios.post("/api/uj-ugyintezo", data);
      console.log("Új ügyintéző felvéve: ", response);

      setUgyintezoLista((prev) => [...prev, response.data]);
      return true;
    } catch (e) {
      console.log(e.response.data.errors);
      return false;
    }
  };*/

};
