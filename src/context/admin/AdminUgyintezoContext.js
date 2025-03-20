import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { myAxios } from "../MyAxios";
import { ApiContext } from "../ApiContext";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const AdminUgyintezoContext = createContext("");

export const AdminUgyintezoProvider = ({ children }) => {
  const [editLoading, setEditLoading] = useState(false);
  const { ugyintezoLista, setUgyintezoLista } = useContext(ApiContext);
  const [kivalasztottUgyintezo, setKivalasztottUgyintezo] = useState();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [szurtUgyintezoLista, setSzurtUgyintezoLista] =
    useState(ugyintezoLista);

  useEffect(() => {
    setSzurtUgyintezoLista(ugyintezoLista);
  }, [ugyintezoLista]);

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

  const ugyintezoAdatokSchema = z.object({
    nev: z.string().min(1, "A név megadása kötelező"),
    email: z.string().email("Érvényes e-mail címet adj meg"),
    master: z.boolean().optional(),
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
    resolver: zodResolver(ugyintezoAdatokSchema),
    shouldUnregister: false,
    defaultValues: {
      nev: "",
      email: "",
      master: false,
    },
  });

  useEffect(() => {
    if (kivalasztottUgyintezo) {
      const kivalasztott = ugyintezoLista.find(
        (ugyintezo) => ugyintezo.id === kivalasztottUgyintezo
      );
      if (kivalasztott) {
        reset({
          nev: kivalasztott.name,
          email: kivalasztott.email,
          master: kivalasztott.role > 1,
        });
      }
    }
  }, [kivalasztottUgyintezo, ugyintezoLista, reset]);

  const handleUgyintezoAdatok = async () => {
    const adatok = getValues(["nev", "email", "master"]);

    const ugyintezoAdatok = {
      name: adatok[0],
      email: adatok[1],
      role: adatok[2] ? 2 : 1,
    };

    try {
      setEditLoading(true);
      const response = await myAxios.patch(
        `/api/modosit-ugyintezo/${kivalasztottUgyintezo}`,
        ugyintezoAdatok
      );
      console.log("Módosítás sikeres:", response.data);

      setUgyintezoLista((prevLista) =>
        prevLista.map((ugyintezo) =>
          ugyintezo.id === kivalasztottUgyintezo
            ? { ...ugyintezo, ...ugyintezoAdatok } 
            : ugyintezo
        )
      );

      setSzurtUgyintezoLista((prevLista) =>
        prevLista.map((ugyintezo) =>
          ugyintezo.id === kivalasztottUgyintezo
            ? { ...ugyintezo, ...ugyintezoAdatok } 
            : ugyintezo
        )
      );
    } catch (error) {
      console.error("Hiba történt a módosítás során:", error);
    } finally {
      setEditLoading(false);
    }
  };

  const torlesUgyintezo = async (id) => {
    try {
      const response = await myAxios.delete(`/api/delete-ugyintezo/${id}`);
      console.log("Törlés sikeres:", response.data);

      setUgyintezoLista((prevLista) =>
        prevLista.filter((ugyintezo) => ugyintezo.id !== id)
      );

      setSzurtUgyintezoLista((prevLista) =>
        prevLista.filter((ugyintezo) => ugyintezo.id !== id)
      );
    } catch (error) {
      console.error("Hiba történt az ügyintéző törlésekor:", error);
    }
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
        ugyintezoLista,
        setKivalasztottUgyintezo,
        torlesUgyintezo,
        szurtUgyintezoLista,
        setSzurtUgyintezoLista,
        kivalasztottUgyintezo,
      }}
    >
      {children}
    </AdminUgyintezoContext.Provider>
  );
};
