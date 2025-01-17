import { createContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const SzemelyesAdatokContext = createContext("");

export const SzemelyesAdatokProvider = ({ children }) => {
  const szemelyesAdatokSchema = z.object({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(szemelyesAdatokSchema),
    shouldUnregister: true,
    defaultValues: {},
  });

  const szemelyesAdatokFelvesz = () => {
    const adatok = getValues([
      "nev",
      "email",
      "tel",
      "szakok",
      "portfolioSzakok",
    ]);

    const szemelyesAdatok = {
      //   beiratkozas: { nev: adatok[0], email: adatok[1], tel: adatok[2] },
    };
  };

  return (
    <SzemelyesAdatokContext.Provider
      value={{
        szemelyesAdatokFelvesz,
        register,
        handleSubmit,
        isSubmitting,
        errors,
      }}
    >
      {children}
    </SzemelyesAdatokContext.Provider>
  );
};
