import { createContext, useContext, useState } from "react";
import { myAxios } from "../MyAxios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BeiratkozasContext } from "./BeiratkozasContext";
import useAuthContext from "../AuthContext";

export const SorrendContext = createContext();

export const SorrendProvider = ({ children }) => {
  const [jelentkezesek, setJelentkezesek] = useState([]);
  const [sorrendLoading, setSorrendLoading] = useState(true);
  const { stepperActive, setStepperActive } = useContext(BeiratkozasContext);
  const [isOpen, setIsOpen] = useState(false);
  // const { user } = useAuthContext();

  const sorrendSchema = z.object({});

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(sorrendSchema),
    shouldUnregister: true,
    defaultValues: {},
  });

  const handleSorrend = async () => {
    if (!jelentkezesek.length) return;

    try {
      const response = await myAxios.patch(
        `/api/jelentkezesek/sorrend/${jelentkezesek[0].jelentkezo_id}/${stepperActive > 2 ? 0 : 1}`,
        {
          jelentkezesek: jelentkezesek.map((item) => ({
            szak_id: item.szak_id,
            sorrend: item.sorrend,
          })),
        }
      );

      if (stepperActive <= 2) {
        setStepperActive(3);
      }

      setIsOpen(false);
      console.log(response.data);
    } catch (error) {
      console.error("Hiba részletei:", {
        üzenet: error.message,
        válasz: error.response?.data,
        státusz: error.response?.status,
      });
    }
  };

  const sorrendLekerdez = async () => {};

  return (
    <SorrendContext.Provider
      value={{
        jelentkezesek,
        handleSorrend,
        setJelentkezesek,
        register,
        handleSubmit,
        isSubmitting,
        sorrendLoading,
        setSorrendLoading,
        sorrendLekerdez,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </SorrendContext.Provider>
  );
};
