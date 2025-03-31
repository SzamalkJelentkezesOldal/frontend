import { useContext } from "react";
import { AdminUgyintezoContext } from "../../../context/admin/AdminUgyintezoContext";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

function AdminModosit() {
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    getValues,
    kivalasztottUgyintezo,
    ugyintezoLista,
  } = useContext(AdminUgyintezoContext);

  const kivalasztottUgyintezoAdatok = ugyintezoLista.find(
    (ugyintezo) => ugyintezo.id === kivalasztottUgyintezo
  );

  return (
    <>
      <TextField
        autoFocus
        required
        {...register("nev")}
        margin="dense"
        id="nev"
        name="nev"
        label="Név"
        type="text"
        error={!!errors.nev}
        helperText={errors.nev?.message}
        fullWidth
        variant="standard"
      />

      <TextField
        autoFocus
        required
        {...register("email")}
        margin="dense"
        id="email"
        name="email"
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        variant="standard"
      />

      <FormControlLabel
        control={
          <Checkbox
            {...register("master")}
            defaultChecked={kivalasztottUgyintezoAdatok?.role > 1}
          />
        }
        label="Master"
      />
    </>
  );
}

export default AdminModosit;
