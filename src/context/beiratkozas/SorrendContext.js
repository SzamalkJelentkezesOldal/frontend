import { createContext, useState } from "react";
import { myAxios } from "../MyAxios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SorrendContext = createContext();

export const SorrendProvider = ({ children }) => {
  const [jelentkezesek, setJelentkezesek] = useState([]);

  const sorrendSchema = z.object({});

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(sorrendSchema),
    shouldUnregister: true,
    defaultValues: {},
  });

  const updateSorrend = async () => {
    try {
      const response = await myAxios.patch(
        `/api/jelentkezesek/sorrend/${jelentkezesek[0].jelentkezo_id}`,
        {
          jelentkezesek: jelentkezesek.map((item) => ({
            szak_id: item.szak_id,
            sorrend: item.sorrend,
          })),
        }
      );
      console.log(response);
    } catch (error) {
      console.error("Hiba a sorrend mentésekor:", error);
    }
  };

  return (
    <SorrendContext.Provider
      value={{
        jelentkezesek,
        updateSorrend,
        setJelentkezesek,
        register,
        handleSubmit,
        isSubmitting,
      }}
    >
      {children}
    </SorrendContext.Provider>
  );
};
