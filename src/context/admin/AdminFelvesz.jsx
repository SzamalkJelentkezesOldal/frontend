import { createContext } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { myAxios } from "../MyAxios";

export const AdminFelveszContext = createContext("");

export const AdminFelveszProvider = ({ children }) => {
  const felveszSchema = z.object({
    nev: z.string().min(3, "Érvénytelen név, legalább 3 betű!"),
    email: z.string().email("Érvénytelen e-mail cím!"),
    jelszo: z.string().min(8, "A jelszó legalább 8 karakter hosszú legyen!"),
    jelszoMegerosites: z.string().min(8, "A jelszó megerősítése is legalább 8 karakter hosszú kell legyen!"),
    master: z.boolean(),
  }).refine((data) => data.jelszo === data.jelszoMegerosites, {
    message: "A jelszavak nem egyeznek!",
    path: ["jelszoMegerosites"], 
  });

  const ugyintezoFelvesz = async () => {
    const adatok = getValues([
      "nev",
      "email",
      "jelszo",
      "jelszoMegerosites",
      "master",
    ]);

    const ugyintezoAdatok = {
        nev: adatok[0],
        email: adatok[1],
        jelszo: adatok[2],
        jelszoMegerosites: adatok[3],
        master: adatok[4],
    };

    const result = await postUgyintezo(ugyintezoAdatok);
    if (result) {
        reset();
      }
}

const postUgyintezo = async (data) => {
    try {
        const response = await myAxios.post("/api/uj-ugyintezo", data);
        console.log("Új ügyintéző felvéve: ", response);
        return true;
      } catch (e) {
        console.log(e.response.data.errors);
        return false;
      }
}

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm({
    resolver: zodResolver(felveszSchema),
    defaultValues: { nev:"", email: "", password: "", master: "" },
  });

  return (
    <AdminFelveszContext.Provider
      value={{
        formRegister,
        handleSubmit,
        errors,
        isSubmitting,
        ugyintezoFelvesz
      }}
    >
      {children}
    </AdminFelveszContext.Provider>
  );
};
