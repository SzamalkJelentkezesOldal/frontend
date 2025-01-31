import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";
import { myAxios } from "../MyAxios";

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

  const nyilatkozatLetoltes = async () => {
    const year = new Date().getFullYear();
    try {
      await myAxios.get("/sanctum/csrf-cookie");

      const response = await myAxios.get(`/api/nyilatkozat-letoltes/${year}`, {
        responseType: "blob",
        validateStatus: (status) => status === 200,
      });

      if (
        response.headers["content-type"] !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        throw new Error("Érvénytelen fájlformátum");
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `nyilatkozat_${year}.docx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      console.log(response);
    } catch (error) {
      console.error(
        "Letöltési hiba:",
        error.response?.data?.error || error.message
      );
      console.log(error.response?.data?.error || "Ismeretlen hiba történt");
    }
  };

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
        nyilatkozatLetoltes,
      }}
    >
      {children}
    </DokumentumokContext.Provider>
  );
};
