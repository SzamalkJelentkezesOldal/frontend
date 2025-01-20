import { createContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const AdminBelepesContext = createContext("");

export const AdminBelepesProvider = ({ children }) => {
  const belepesSchema = z.object({
    email: z.string().email("Érvénytelen e-mail cím!"),
    password: z.string().min(8, "A jelszó legalább 8 karakter hosszú legyen!"),
  });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(belepesSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <AdminBelepesContext.Provider
      value={{
        formRegister,
        handleSubmit,
        errors,
        reset,
        isSubmitting,
        getValues,
      }}
    >
      {children}
    </AdminBelepesContext.Provider>
  );
};
