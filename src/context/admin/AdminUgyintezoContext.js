import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myAxios } from "../MyAxios";
import { ApiContext } from "../ApiContext";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const AdminUgyintezoContext = createContext("");

export const AdminUgyintezoProvider = ({ children }) => {
  const [editLoading, setEditLoading] = useState(false);
  const { ugyintezoLista } = useContext(ApiContext);


  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ugyintezoAdatokSchema = z
    .object({
      nev: z.string().min(1, "A név megadása kötelező"),
      email: z.string().email("Érvényes e-mail címet adj meg"),
      master: z.boolean().optional(),
    })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(ugyintezoAdatokSchema),
    shouldUnregister: false,
    defaultValues: {
      nev: "",
      email: "",
      master: false,  
    },
  });

  const handleUgyintezoAdatok = async () => {
    const adatok = getValues([
      "nev",
      "email",
      "master",
    ]);

    const ugyintezoAdatok = {
      name: adatok[0],
      email: adatok[1],
      role: adatok[2] ? 2 : 1,
    };
  };

  return (
    <AdminUgyintezoContext.Provider
      value={{
        register,
        handleSubmit,
        isSubmitting,
        errors,
        getValues,
        editLoading,
        handleUgyintezoAdatok,
        handleClickOpen,
        handleClose,
        theme,
        fullScreen,
        open,
        setOpen,
        ugyintezoLista,
      }}
    >
      {children}
    </AdminUgyintezoContext.Provider>
  );
};
