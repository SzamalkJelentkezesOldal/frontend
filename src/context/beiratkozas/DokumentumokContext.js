import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";
import { myAxios } from "../MyAxios";

export const DokumentumokContext = createContext("");

export const DokumentumokProvider = ({ children }) => {
  const { setStepperActive } = useContext(BeiratkozasContext);
  const [resetTrigger, setResetTrigger] = useState(false);

  const dokumentumokSchema = z.object({
    adoazonosito: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    taj: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    szemelyi_elso: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    szemelyi_hatso: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    lakcim_elso: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    lakcim_hatso: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    onarckep: z.any().refine((val) => {
      if (val instanceof FileList) return val.length === 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    nyilatkozatok: z.any().refine((val) => {
      if (val instanceof FileList) return val.length >= 1;
      return val instanceof File;
    }, "Kötelező feltölteni"),
    erettsegik: z
      .any()
      .refine(
        (val) => !val || val instanceof FileList || val instanceof File,
        "Érvénytelen fájl"
      )
      .optional(),
    tanulmanyik: z
      .any()
      .refine(
        (val) => !val || val instanceof FileList || val instanceof File,
        "Érvénytelen fájl"
      )
      .optional(),
    specialisok: z
      .any()
      .refine(
        (val) => !val || val instanceof FileList || val instanceof File,
        "Érvénytelen fájl"
      )
      .optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(dokumentumokSchema),
    shouldUnregister: true,
    defaultValues: {
      adoazonosito: undefined,
      taj: undefined,
      szemelyi_elso: undefined,
      szemelyi_hatso: undefined,
      lakcim_elso: undefined,
      lakcim_hatso: undefined,
      onarckep: undefined,
      nyilatkozatok: undefined,
      erettsegik: undefined,
      tanulmanyik: undefined,
      specialisok: undefined,
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
    }
  };

  const dokumentumokFelvesz = async () => {
    const adatok = getValues([
      "adoazonosito",
      "taj",
      "szemelyi_elso",
      "szemelyi_hatso",
      "lakcim_elso",
      "lakcim_hatso",
      "onarckep",
      "nyilatkozatok",
      "erettsegik",
      "tanulmanyik",
      "specialisok",
    ]);

    const dokumentumAdatok = {
      adoazonosito: adatok[0],
      taj: adatok[1],
      szemelyi_elso: adatok[2],
      szemelyi_hatso: adatok[3],
      lakcim_elso: adatok[4],
      lakcim_hatso: adatok[5],
      onarckep: adatok[6],
      nyilatkozatok: adatok[7],
      erettsegik: adatok[8],
      tanulmanyik: adatok[9],
      specialisok: adatok[10],
    };

    const response = await postDokumentumok(dokumentumAdatok);
    if (response) {
      reset();
    }
  };

  const postDokumentumok = async (data) => {
    setResetTrigger(false);
    try {
      const formData = new FormData();

      const allFields = [
        "adoazonosito",
        "taj",
        "szemelyi_elso",
        "szemelyi_hatso",
        "lakcim_elso",
        "lakcim_hatso",
        "onarckep",
        "nyilatkozatok",
        "erettsegik",
        "tanulmanyik",
        "specialisok",
      ];

      allFields.forEach((field) => {
        const value = data[field];
        if (value) {
          if (value instanceof File) {
            formData.append(`${field}[]`, value);
          } else if (value instanceof FileList) {
            Array.from(value).forEach((file) => {
              formData.append(`${field}[]`, file);
            });
          }
        }
      });

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await myAxios.post("/api/dokumentumok-feltolt", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResetTrigger(true);
      setStepperActive(2);
      return true;
    } catch (error) {
      console.error("Hiba:", error.response?.data || error.message);
      return false;
    }
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
        resetTrigger,
        setValue,
      }}
    >
      {children}
    </DokumentumokContext.Provider>
  );
};
