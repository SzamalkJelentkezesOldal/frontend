import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";
import { myAxios } from "../MyAxios";
import useAuthContext from "../AuthContext";

export const SzemelyesAdatokContext = createContext("");

export const SzemelyesAdatokProvider = ({ children }) => {
  const [magyar, setMagyar] = useState(false);
  const { setStepperActive } = useContext(BeiratkozasContext);
  const { user } = useAuthContext();

  const szemelyesAdatokSchema = z
    .object({
      vezeteknev: z.string().min(1, "A vezetéknév kitöltendő!"),
      keresztnev: z.string().min(1, "A keresztnév kitöltendő!"),
      szuletesi_nev: z.string().optional(),
      allampolgarsag: z.string().min(1, "Az állampolgárság kitöltendő!"),
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
      anyja_neve: z.string().min(1, "Az anyja neve kitöltendő!"),
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
      szuletesi_hely: z.string().min(1, "A születési hely kitöltendő!"),
      lakcim: z.string().min(1, "Az állandó lakcím kitöltendő!"),
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
    watch,
  } = useForm({
    resolver: zodResolver(szemelyesAdatokSchema),
    shouldUnregister: true,
    defaultValues: {
      allampolgarsag: "",
    },
  });

  const szemelyesAdatokFelvesz = async () => {
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
      "lakcim",
    ]);

    const szemelyesAdatok = {
      email: user.email,
      vezeteknev: adatok[0],
      keresztnev: adatok[1],
      szuletesi_nev: adatok[2],
      allampolgarsag: adatok[3],
      adoazonosito: adatok[4],
      taj_szam: adatok[5],
      anyja_neve: adatok[6],
      szuletesi_datum: adatok[7],
      szuletesi_hely: adatok[8],
      lakcim: adatok[9],
    };

    try {
      const response = await myAxios.post(
        "/api/torzsadat-feltolt",
        szemelyesAdatok
      );
      console.log(response);

      setStepperActive(1);
    } catch (e) {
      console.log(e);
    }
  };

  const allampolgarsag = watch("allampolgarsag");
  useEffect(() => {
    setMagyar(allampolgarsag?.toLowerCase().trim() === "magyar");
  }, [allampolgarsag]);

  return (
    <SzemelyesAdatokContext.Provider
      value={{
        szemelyesAdatokFelvesz,
        register,
        handleSubmit,
        isSubmitting,
        errors,
        getValues,
        magyar,
      }}
    >
      {children}
    </SzemelyesAdatokContext.Provider>
  );
};
