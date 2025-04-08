import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myAxios } from "../MyAxios";
import { ApiContext } from "../ApiContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const AdminSzakContext = createContext("");

export const AdminSzakProvider = ({ children }) => {
  const [editLoading, setEditLoading] = useState(false);
  const { szakLista, setSzakLista } = useContext(ApiContext);
  const [kivalasztottSzak, setKivalasztottSzak] = useState();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [szurtSzakLista, setSzurtSzakLista] = useState(szakLista);

  useEffect(() => {
    setSzurtSzakLista(szakLista);
  }, [szakLista]);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const szakAdatokSchema = z.object({
    elnevezes: z.string().min(1, "Az elnevezés megadása kötelező"),
    portfolio: z.boolean(),
    nappali: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, dirtyFields },
    getValues,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(szakAdatokSchema),
    shouldUnregister: false,
    defaultValues: {
      elnevezes: "",
      portfolio: false,
      nappali: false,
    },
  });

  useEffect(() => {
    if (kivalasztottSzak) {
      const kivalasztott = szakLista.find(
        (szak) => szak.id === kivalasztottSzak
      );
      if (kivalasztott) {
        reset({
          elnevezes: kivalasztott.elnevezes,
          portfolio: kivalasztott.portfolio ?? false,
          nappali: kivalasztott.nappali ?? false,
        });
      }
    }
  }, [kivalasztottSzak, szakLista, reset]);

  const handleSzakAdatok = async () => {
    const adatok = getValues();

    const szakAdatok = {
      elnevezes: adatok.elnevezes || "",
      portfolio: Boolean(adatok.portfolio) ? 1 : 0,
      nappali: Boolean(adatok.nappali) ? 1 : 0,
    };

    try {
      setEditLoading(true);
      const response = await myAxios.patch(
        `/api/modosit-szak/${kivalasztottSzak}`,
        szakAdatok
      );
      console.log("Módosítás sikeres:", response.data);

      setSzakLista((prevLista) =>
        prevLista.map((szak) =>
          szak.id === kivalasztottSzak ? { ...szak, ...szakAdatok } : szak
        )
      );

      setSzurtSzakLista((prevLista) =>
        prevLista.map((szak) =>
          szak.id === kivalasztottSzak ? { ...szak, ...szakAdatok } : szak
        )
      );
    } catch (error) {
      console.error("Hiba történt a módosítás során:", error);
    } finally {
      setEditLoading(false);
      handleCloseEdit();
    }
  };

  const torlesSzak = async (id) => {
    try {
      const response = await myAxios.delete(`/api/delete-szak/${id}`);
      console.log("Törlés sikeres:", response.data);

      setSzakLista((prevLista) => prevLista.filter((szak) => szak.id !== id));

      setSzurtSzakLista((prevLista) =>
        prevLista.filter((szak) => szak.id !== id)
      );
    } catch (error) {
      console.error("Hiba történt a szak törlésekor:", error);
    }
  };

  return (
    <AdminSzakContext.Provider
      value={{
        reset,
        register,
        handleSubmit,
        isSubmitting,
        errors,
        getValues,
        editLoading,
        handleSzakAdatok,
        handleClickOpenEdit,
        handleCloseEdit,
        handleClickOpenDelete,
        handleCloseDelete,
        theme,
        fullScreen,
        openEdit,
        openDelete,
        setOpenEdit,
        setOpenDelete,
        szakLista,
        setKivalasztottSzak,
        torlesSzak,
        szurtSzakLista,
        setSzurtSzakLista,
        setSzakLista,
        kivalasztottSzak,
      }}
    >
      {children}
    </AdminSzakContext.Provider>
  );
};
