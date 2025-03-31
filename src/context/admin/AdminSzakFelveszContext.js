import { createContext, useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "../MyAxios";

export const AdminSzakFelveszContext = createContext("");

export const AdminSzakFelveszProvider = ({ children }) => {
  const [szakLista, setSzakLista] = useState([]);

  const felveszSchema = z.object({
    elnevezes: z.string().min(3, "Az elnevezés legalább 3 karakter hosszú legyen!"),
    portfolio: z.string().min(3, "A portfólió legalább 3 karakter hosszú legyen!"),
    tagozat: z.string().min(3, "A tagozat legalább 3 karakter hosszú legyen!"),
    nappali: z.boolean(),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(felveszSchema),
    defaultValues: { elnevezes: "", portfolio: "", tagozat: "", nappali: false },
  });

  // Meglévő szakok lekérése a komponens betöltésekor
  useEffect(() => {
    const fetchSzakok = async () => {
      try {
        const response = await myAxios.get("/api/szakok"); // Alkalmazd a megfelelő végpontot!
        setSzakLista(response.data);
      } catch (error) {
        console.error("Hiba a szakok lekérésekor:", error);
      }
    };

    fetchSzakok();
  }, []);

  const postSzak = async (data) => {
    try {
      const response = await myAxios.post("/api/uj-szak", data);
      console.log("Új szak felvéve: ", response);
      setSzakLista((prev) => [...prev, response.data]);
      return true;
    } catch (e) {
      console.error("Hiba a szak felvételekor:", e.response?.data?.errors || e.message);
      return false;
    }
  };

  const szakFelvesz = async () => {
    const adatok = getValues(["elnevezes", "portfolio", "tagozat", "nappali"]);

    const szakAdatok = {
      elnevezes: adatok[0],
      portfolio: adatok[1],
      tagozat: adatok[2],
      nappali: adatok[3],
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
        szakLista,
        setSzakLista,
        // Az alábbi funkciók a módosítás/törlés dialógusokhoz vannak (még nincs implementálva a funkcionalitásuk)
        handleSzakAdatok: () => {},
        handleClickOpenEdit: () => {},
        handleCloseEdit: () => {},
        handleClickOpenDelete: () => {},
        handleCloseDelete: () => {},
        torlesSzak: () => {},
        openEdit: false,
        openDelete: false,
        setKivalasztottSzak: () => {},
        kivalasztottSzak: null,
      }}
    >
      {children}
    </AdminSzakFelveszContext.Provider>
  );
};