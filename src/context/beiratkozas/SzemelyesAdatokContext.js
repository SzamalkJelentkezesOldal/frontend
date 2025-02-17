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
  const { stepperActive, setStepperActive } = useContext(BeiratkozasContext);
  const [editLoading, setEditLoading] = useState(false);
  const { user, jelentkezoID } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const szemelyesAdatokSchema = z
    .object({
      vezeteknev: z.string().min(1, "A vezetéknév kitöltendő!"),
      keresztnev: z.string().min(1, "A keresztnév kitöltendő!"),
      szuletesi_nev: z
        .string()
        .optional()
        .nullable()
        .transform((val) => val ?? ""),
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
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(szemelyesAdatokSchema),
    shouldUnregister: false,
    defaultValues: {
      vezeteknev: "",
      keresztnev: "",
      szuletesi_nev: "",
      anyja_neve: "",
      lakcim: "",
      szuletesi_hely: "",
      szuletesi_datum: "",
      allampolgarsag: "",
      adoazonosito: "",
      taj_szam: "",
    },
  });

  const handleSzemelyesAdatok = async () => {
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

    if (stepperActive > 0) {
      const teljesAdatok = getValues();

      try {
        const response = await myAxios.patch(
          `/api/torzsadat-frissit/${jelentkezoID}`,
          teljesAdatok
        );
        console.log("Módosítás sikeres:", response);

        setIsOpen(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await myAxios.post(
          "/api/torzsadat-feltolt",
          szemelyesAdatok
        );
        console.log(response);

        setIsOpen(false);
        setStepperActive(1);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const adatokEdit = async () => {
    try {
      setEditLoading(true);
      const torzsadatok = await myAxios.get(
        `/api/jelentkezo-adatai/${user.email}`
      );
      const formattedData = {
        ...torzsadatok.data,
        adoazonosito: torzsadatok.data.adoazonosito || "",
        taj_szam: torzsadatok.data.taj_szam || "",
      };
      reset(formattedData);
    } catch (e) {
      console.log("törzsadat lekérés hiba", e);
    } finally {
      setEditLoading(false);
    }
  };

  const allampolgarsag = watch("allampolgarsag");
  useEffect(() => {
    setMagyar(allampolgarsag?.toLowerCase().trim() === "magyar");
  }, [allampolgarsag]);

  return (
    <SzemelyesAdatokContext.Provider
      value={{
        handleSzemelyesAdatok,
        register,
        handleSubmit,
        isSubmitting,
        errors,
        getValues,
        magyar,
        adatokEdit,
        editLoading,
        isDirty,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SzemelyesAdatokContext.Provider>
  );
};
