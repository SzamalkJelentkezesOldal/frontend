import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";

export const DokumentumokContext = createContext("");

export const DokumentumokProvider = ({ children }) => {
  const [magyar, setMagyar] = useState(false);
  const { setStepperActive } = useContext(BeiratkozasContext);

  const dokumentumokSchema = z
    .object({
      vezeteknev: z.string().min(1, "A vezetéknév nem lehet üres!"),
      keresztnev: z.string().min(1, "A keresztnév nem lehet üres!"),
      szuletesi_nev: z.string().optional(),
      allampolgarsag: z.string().min(1, "Az állampolgárság nem lehet üres!"),
      adoazonosito: z
        .string()
        .optional()
        .refine(
          (adoazonosito) => !adoazonosito || /^\d{10}$/.test(adoazonosito),
          "Az adóazonosító számnak pontosan 10 számjegyből kell állnia!"
        ),
      taj_szam: z
        .string()
        .optional()
        .refine(
          (taj_szam) => !taj_szam || /^\d{9}$/.test(taj_szam),
          "A TAJ számnak pontosan 9 számjegyből kell állnia!"
        ),
      anyja_neve: z.string().min(1, "Az anyja neve nem lehet üres!"),
      szuletesi_datum: z.string().refine((datum) => {
        const parsedDate = Date.parse(datum);
        if (isNaN(parsedDate)) return false;

        const birthDate = new Date(parsedDate);
        const today = new Date();

        const age = today.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassedThisYear =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

        const actualAge = isBirthdayPassedThisYear ? age : age - 1;

        return actualAge >= 15;
      }, "A születési dátum nem érvényes!"),
      szuletesi_hely: z.string().min(1, "A születési hely nem lehet üres!"),
      szulo_elerhetoseg: z
        .string()
        .length(11, "A telefonszámnak 11 karakter hosszúnak kell lennie!"),
    })
    .refine(
      (data) => {
        const magyar = data.allampolgarsag.toLowerCase().trim() === "magyar";
        if (magyar) {
          return data.adoazonosito && data.taj_szam;
        }
        return true;
      },
      {
        message:
          "Magyar állampolgárság esetén az adóazonosító szám és a TAJ szám megadása kötelező.",
        path: ["allampolgarsag"],
      }
    );

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

  const szemelyesAdatokFelvesz = () => {
    const adatok = getValues([
      "vezeteknev",
      "keresztnev",
      "szuletesi_nev",
      "allampolgarsag",
      "adoazonosito",
      "taj_szam",
      "anyja_neve",
      "szuletesi_datum",
      "szuletesi_hely",
      "szulo_elerhetoseg",
    ]);

    const szemelyesAdatok = {
      vezeteknev: adatok[0],
      keresztnev: adatok[1],
      szuletesi_nev: adatok[2],
      allampolgarsag: adatok[3],
      adoazonosito: adatok[4],
      taj_szam: adatok[5],
      anyja_neve: adatok[6],
      szuletesi_datum: adatok[7],
      szuletesi_hely: adatok[8],
      szulo_elerhetoseg: adatok[9],
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
