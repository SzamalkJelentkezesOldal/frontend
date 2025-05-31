import { createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiContext } from "../ApiContext"; // 💡 Hozzáadás!
import { myAxios } from "../MyAxios";

export const AdminSzakFelveszContext = createContext("");

export const AdminSzakFelveszProvider = ({ children }) => {
  const { refreshSzaklista } = useContext(ApiContext); // 🧠 API context-ből frissítő függvény

  const felveszSchema = z.object({
    elnevezes: z.string().min(3, "Az elnevezés legalább 3 karakter hosszú legyen!"),
    portfolio: z.enum(["Igen", "Nem"], {
      required_error: "A portfólió kiválasztása kötelező!",
    }),
    nappali: z.enum(["Igen", "Nem"], {
      required_error: "A tagozat kiválasztása kötelező!",
    }),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(felveszSchema),
    defaultValues: { elnevezes: "", portfolio: false, nappali: false },
  });

  const postSzak = async (data) => {
    try {
      await myAxios.post("/api/uj-szak", data);
      await refreshSzaklista(); // 🆕 Lista újratöltése sikeres POST után
      return true;
    } catch (e) {
      return false;
    }
  };

  const szakFelvesz = async () => {
    const adatok = getValues(["elnevezes", "portfolio", "nappali"]);
    const szakAdatok = {
      elnevezes: adatok[0],
      portfolio: adatok[1] === "Igen",
      nappali: adatok[2] === "Igen",
    };

    const result = await postSzak(szakAdatok);
    if (result) {
      reset();
    }
  };

  return (
    <AdminSzakFelveszContext.Provider
      value={{
        formRegister,
        handleSubmit,
        errors,
        isSubmitting,
        szakFelvesz,
      }}
    >
      {children}
    </AdminSzakFelveszContext.Provider>
  );
};
