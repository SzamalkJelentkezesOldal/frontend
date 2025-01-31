import { createContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "../MyAxios";

export const AdminNyilatkozatContext = createContext("");

export const AdminNyilatkozatProvider = ({ children }) => {
  const jelenlegiEv = new Date().getFullYear();
  const [resetTrigger, setResetTrigger] = useState(false);

  const nyilatkozatSchema = z.object({
    ev: z
      .number()
      .min(jelenlegiEv, `Az év nem lehet kisebb, mint ${jelenlegiEv}!`)
      .max(
        jelenlegiEv + 1,
        `Az év nem lehet nagyobb, mint ${jelenlegiEv + 1}!`
      ),
    nyilatkozat: z
      .any()
      .refine((val) => {
        if (val instanceof FileList) return val.length === 1;
        return val instanceof File;
      }, "Kötelező fájlt feltölteni!")
      .refine((val) => {
        const file = val instanceof FileList ? val[0] : val;
        return (
          file?.name?.endsWith(".docx") &&
          file?.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        );
      }, "Csak .docx formátum elfogadott!"),
  });

  const nyilatkozatFeltolt = async () => {
    const adatok = getValues(["ev", "nyilatkozat"]);

    const nyilatkozatAdatok = {
      ev: adatok[0],
      nyilatkozat: adatok[1],
    };

    const result = await postNyilatkozat(nyilatkozatAdatok);
    if (result) {
      reset();
    }
  };

  const postNyilatkozat = async (adat) => {
    setResetTrigger(false);
    try {
      const formData = new FormData();
      const file =
        adat.nyilatkozat instanceof FileList
          ? adat.nyilatkozat[0]
          : adat.nyilatkozat;

      formData.append("ev", adat.ev);
      formData.append("nyilatkozat", file);

      const response = await myAxios.post(
        "/api/nyilatkozat-feltoltes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setResetTrigger(true);
      return true;
    } catch (error) {
      console.error("Hiba:", error.response?.data);
      return false;
    }
  };

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(nyilatkozatSchema),
    defaultValues: { ev: jelenlegiEv, nyilatkozat: new DataTransfer().files },
  });

  return (
    <AdminNyilatkozatContext.Provider
      value={{
        formRegister,
        handleSubmit,
        errors,
        isSubmitting,
        nyilatkozatFeltolt,
        jelenlegiEv,
        watch,
        getValues,
        setValue,
        resetTrigger,
      }}
    >
      {children}
    </AdminNyilatkozatContext.Provider>
  );
};
