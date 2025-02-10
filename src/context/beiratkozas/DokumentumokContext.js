import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";
import { myAxios } from "../MyAxios";
export const DokumentumokContext = createContext("");

const fileSchema = z.custom(
  (val) => {
    return typeof val === "string" || val instanceof File;
  },
  {
    message: "Input must be a File instance or a string",
  }
);

// Az alap séma – minden file mező opcionális, majd majd a superRefine ellenőrzi a kötelezőket
const dokumentumokSchemaBase = z.object({
  adoazonosito: fileSchema.optional(),
  taj: fileSchema.optional(),
  szemelyi_elso: fileSchema.optional(),
  szemelyi_hatso: fileSchema.optional(),
  lakcim_elso: fileSchema.optional(),
  lakcim_hatso: fileSchema.optional(),
  onarckep: fileSchema.optional(),
  nyilatkozatok: fileSchema.optional(),
  erettsegik: fileSchema.optional(),
  tanulmanyik: fileSchema.optional(),
  specialisok: fileSchema.optional(),

  // A current mezők a meglévő fájlok JSON tömbjét tartalmazzák (stringként)
  adoazonosito_current: z.string().optional(),
  taj_current: z.string().optional(),
  szemelyi_elso_current: z.string().optional(),
  szemelyi_hatso_current: z.string().optional(),
  lakcim_elso_current: z.string().optional(),
  lakcim_hatso_current: z.string().optional(),
  onarckep_current: z.string().optional(),
  nyilatkozatok_current: z.string().optional(),
  erettsegik_current: z.string().optional(),
  tanulmanyik_current: z.string().optional(),
  specialisok_current: z.string().optional(),
});

// Kötelező mezők listája
const requiredFields = [
  "adoazonosito",
  "taj",
  "szemelyi_elso",
  "szemelyi_hatso",
  "lakcim_elso",
  "lakcim_hatso",
  "onarckep",
  "nyilatkozatok",
];

// A végső séma: az alap séma után egy superRefine ellenőrzi, hogy
// minden required mezőnél vagy az új érték, vagy a current (JSON tömbként)
// legalább egy elemet tartalmaz.
const dokumentumokSchema = dokumentumokSchemaBase.superRefine((data, ctx) => {
  requiredFields.forEach((field) => {
    const newValue = data[field];
    const currentStr = data[`${field}_current`];
    let currentValue = [];
    try {
      currentValue = currentStr ? JSON.parse(currentStr) : [];
    } catch (e) {
      currentValue = [];
    }
    if (
      !(newValue || (Array.isArray(currentValue) && currentValue.length > 0))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `${field} is required.`,
        path: [field],
      });
    }
  });
});

export const DokumentumokProvider = ({ children }) => {
  const { setStepperActive } = useContext(BeiratkozasContext);
  const [existingDocuments, setExistingDocuments] = useState({});
  const [resetTrigger, setResetTrigger] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    getValues,
    setValue,
    reset,
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
      adoazonosito_current: "[]",
      taj_current: "[]",
      szemelyi_elso_current: "[]",
      szemelyi_hatso_current: "[]",
      lakcim_elso_current: "[]",
      lakcim_hatso_current: "[]",
      onarckep_current: "[]",
      nyilatkozatok_current: "[]",
      erettsegik_current: "[]",
      tanulmanyik_current: "[]",
      specialisok_current: "[]",
    },
  });

  const hasChanges = Object.keys(dirtyFields).length > 0;

  const dokumentumokLekeres = async () => {
    try {
      setEditLoading(true);
      const response = await myAxios.get("/api/dokumentumok");
      setExistingDocuments(response.data);
      reset({
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
        adoazonosito_current: JSON.stringify(response.data.adoazonosito || []),
        taj_current: JSON.stringify(response.data.taj || []),
        szemelyi_elso_current: JSON.stringify(
          response.data.szemelyi_elso || []
        ),
        szemelyi_hatso_current: JSON.stringify(
          response.data.szemelyi_hatso || []
        ),
        lakcim_elso_current: JSON.stringify(response.data.lakcim_elso || []),
        lakcim_hatso_current: JSON.stringify(response.data.lakcim_hatso || []),
        onarckep_current: JSON.stringify(response.data.onarckep || []),
        nyilatkozatok_current: JSON.stringify(
          response.data.nyilatkozatok || []
        ),
        erettsegik_current: JSON.stringify(response.data.erettsegik || []),
        tanulmanyik_current: JSON.stringify(response.data.tanulmanyik || []),
        specialisok_current: JSON.stringify(response.data.specialisok || []),
      });
    } catch (error) {
      console.error("Hiba a dokumentumok betöltésekor:", error);
    } finally {
      setEditLoading(false);
    }
  };

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
    if (!isDirty) {
      alert("Nincs változás, így nem történik módosítás.");
      return;
    }

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
      "adoazonosito_current",
      "taj_current",
      "szemelyi_elso_current",
      "szemelyi_hatso_current",
      "lakcim_elso_current",
      "lakcim_hatso_current",
      "onarckep_current",
      "nyilatkozatok_current",
      "erettsegik_current",
      "tanulmanyik_current",
      "specialisok_current",
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
      adoazonosito_current: adatok[11],
      taj_current: adatok[12],
      szemelyi_elso_current: adatok[13],
      szemelyi_hatso_current: adatok[14],
      lakcim_elso_current: adatok[15],
      lakcim_hatso_current: adatok[16],
      onarckep_current: adatok[17],
      nyilatkozatok_current: adatok[18],
      erettsegik_current: adatok[19],
      tanulmanyik_current: adatok[20],
      specialisok_current: adatok[21],
    };

    await postDokumentumok(dokumentumAdatok);
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
        const megmaradt = data[`${field}_current`];
        if (megmaradt) {
          formData.append(`${field}_current`, megmaradt);
        }
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
    } catch (error) {
      console.error("Hiba:", error.response?.data || error.message);
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
        existingDocuments,
        dokumentumokLekeres,
        editLoading,
        isDirty,
        hasChanges,
      }}
    >
      {children}
    </DokumentumokContext.Provider>
  );
};
