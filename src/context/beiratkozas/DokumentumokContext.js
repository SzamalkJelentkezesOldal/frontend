import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";

export const DokumentumokContext = createContext("");

export const DokumentumokProvider = ({ children }) => {
  const { setStepperActive } = useContext(BeiratkozasContext);

  const dokumentumokSchema = z.object({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    resolver: zodResolver(dokumentumokSchema),
    shouldUnregister: true,
    defaultValues: {
      allampolgarsag: "",
    },
  });

  const dokumentumokFelvesz = () => {
    const adatok = getValues([
      "adoazonosito",
      "taj",
      "szemelyi_elso",
      "szemelyi_hatso",
      "lakcim_elso",
      "lakcim_hatso",
      "erettsegik",
      "tanulmanyik",
    ]);

    const szemelyesAdatok = {
      adoazonosito: adatok[0],
      taj: adatok[1],
      szemelyi_elso: adatok[2],
      szemelyi_hatso: adatok[3],
      lakcim_elso: adatok[4],
      lakcim_hatso: adatok[5],
      erettsegik: adatok[6],
      tanulmanyik: adatok[7],
    };

    setStepperActive(2);
  };
  return (
    <DokumentumokContext.Provider
      value={{
        dokumentumokFelvesz,
        register,
        handleSubmit,
        isSubmitting,
        errors,
        getValues,
      }}
    >
      {children}
    </DokumentumokContext.Provider>
  );
};
