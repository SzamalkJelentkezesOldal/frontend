import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";

export const DokumentumokContext = createContext("");

export const DokumentumokProvider = ({ children }) => {
  const { setStepperActive } = useContext(BeiratkozasContext);

  const dokumentumokSchema = z.object({
    adoazonosito: z
      .array(z.instanceof(File))
      .length(1, "Egy fájlt kell feltölteni az adóazonosítóhoz.")
      .nonempty("Az adóazonosító feltöltése kötelező."),
    taj: z
      .array(z.instanceof(File))
      .length(1, "Egy fájlt kell feltölteni a TAJ-hoz.")
      .nonempty("A TAJ feltöltése kötelező."),
    szemelyi_elso: z
      .array(z.instanceof(File))
      .length(
        1,
        "Egy fájlt kell feltölteni a személyi igazolvány első oldalához."
      )
      .nonempty("A személyi igazolvány első oldalának feltöltése kötelező."),
    szemelyi_hatso: z
      .array(z.instanceof(File))
      .length(
        1,
        "Egy fájlt kell feltölteni a személyi igazolvány hátsó oldalához."
      )
      .nonempty("A személyi igazolvány hátsó oldalának feltöltése kötelező."),
    lakcim_elso: z
      .array(z.instanceof(File))
      .length(1, "Egy fájlt kell feltölteni a lakcímkártya első oldalához.")
      .nonempty("A lakcímkártya első oldalának feltöltése kötelező."),
    lakcim_hatso: z
      .array(z.instanceof(File))
      .length(1, "Egy fájlt kell feltölteni a lakcímkártya hátsó oldalához.")
      .nonempty("A lakcímkártya hátsó oldalának feltöltése kötelező."),
    onarckep: z
      .array(z.instanceof(File))
      .length(1, "Egy fájlt kell feltölteni a lakcímkártya hátsó oldalához.")
      .nonempty("Az önarckép feltöltése kötelező."),
    erettsegik: z.array(z.instanceof(File)).optional(),
    tanulmanyik: z.array(z.instanceof(File)).optional(),
    specialisok: z.array(z.instanceof(File)).optional(),
  });

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
      "onarckep",
      "erettsegik",
      "tanulmanyik",
      "nyilatkozatok",
      "specialisok",
    ]);

    const szemelyesAdatok = {
      adoazonosito: adatok[0],
      taj: adatok[1],
      szemelyi_elso: adatok[2],
      szemelyi_hatso: adatok[3],
      lakcim_elso: adatok[4],
      lakcim_hatso: adatok[5],
      onarckep: adatok[6],
      erettsegik: adatok[7],
      tanulmanyik: adatok[8],
      nyilatkozatok: adatok[9],
      specialisok: adatok[10],
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
