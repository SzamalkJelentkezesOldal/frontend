import React, { createContext, useContext, useEffect, useState } from "react";
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
  const { szakLista, setSzakLista, refreshSzaklista } = useContext(ApiContext);
  const [kivalasztottSzak, setKivalasztottSzak] = useState();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [szurtSzakLista, setSzurtSzakLista] = useState(szakLista);
  useEffect(() => setSzurtSzakLista(szakLista), [szakLista]);

  const handleClickOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const handleClickOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const szakAdatokSchema = z.object({
    elnevezes: z.string().min(1, "Az elnevezés megadása kötelező"),
    portfolio: z.boolean(),
    nappali: z.boolean(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
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
      const adatok = szakLista.find(sz => sz.id === kivalasztottSzak);
      if (adatok) {
        reset({
          elnevezes: adatok.elnevezes,
          portfolio: adatok.portfolio === 1,
          nappali: adatok.nappali === 1,
        });
      }
    }
  }, [kivalasztottSzak, szakLista, reset]);

  const handleSzakAdatok = async () => {
    const adatok = getValues(["elnevezes", "portfolio", "nappali"]);
    const ujSzak = {
      elnevezes: adatok[0] || "",
      portfolio: adatok[1] ? 1 : 0,
      nappali: adatok[2] ? 1 : 0,
    };
    try {
      setEditLoading(true);
      await myAxios.patch(`/api/modosit-szak/${kivalasztottSzak}`, ujSzak);
      await refreshSzaklista();
      setSzakLista(prev => prev.map(sz => sz.id === kivalasztottSzak ? { ...sz, ...ujSzak } : sz));
      setSzurtSzakLista(prev => prev.map(sz => sz.id === kivalasztottSzak ? { ...sz, ...ujSzak } : sz));
    } catch (err) {
      console.error(err);
    } finally {
      setEditLoading(false);
      handleCloseEdit();
    }
  };

  const torlesSzak = async id => {
    try {
      await myAxios.delete(`/api/delete-szak/${id}`);
      await refreshSzaklista();
      setSzakLista(prev => prev.filter(sz => sz.id !== id));
      setSzurtSzakLista(prev => prev.filter(sz => sz.id !== id));
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminSzakContext.Provider value={{
      register,
      handleSubmit,
      isSubmitting,
      errors,
      getValues,
      reset,
      editLoading,
      handleSzakAdatok,
      handleClickOpenEdit,
      handleCloseEdit,
      handleClickOpenDelete,
      handleCloseDelete,
      openEdit,
      openDelete,
      kivalasztottSzak,
      setKivalasztottSzak,
      torlesSzak,
      szakLista,
      szurtSzakLista,
      setSzurtSzakLista,
      fullScreen,
    }}>{children}</AdminSzakContext.Provider>
  );
};
