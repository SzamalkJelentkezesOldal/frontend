import { createContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisztralasContext = createContext("");

export const RegisztralasProvider = ({ children }) => {
  const regisztralasSchema = z
    .object({
      password: z
        .string()
        .min(8, "A jelszó legalább 8 karakter hosszú legyen!"),
      confirmPassword: z
        .string()
        .min(8, "A jelszó legalább 8 karakter hosszú legyen!"),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "A jelszavak nem egyeznek!",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(regisztralasSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <RegisztralasContext.Provider
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
    </RegisztralasContext.Provider>
  );
};
