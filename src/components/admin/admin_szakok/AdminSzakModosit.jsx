import React, { useContext } from "react";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { AdminSzakContext } from "../../../context/admin/AdminSzakContext";

function AdminSzakModosit() {
  const { register, errors, kivalasztottSzak, szakLista } = useContext(AdminSzakContext);
  const kivalasztottSzakAdatok = szakLista.find(sz => sz.id === kivalasztottSzak);

  return (
    <>
      <TextField
        {...register("elnevezes")}
        defaultValue={kivalasztottSzakAdatok?.elnevezes || ""}
        margin="dense"
        label="Elnevezés"
        fullWidth
        variant="standard"
        error={!!errors.elnevezes}
        helperText={errors.elnevezes?.message}
      />
      <FormControlLabel
        control={
          <Checkbox
            {...register("portfolio")}
            defaultChecked={kivalasztottSzakAdatok?.portfolio === 1}
          />
        }
        label="Portfólió"
      />
      <FormControlLabel
        control={
          <Checkbox
            {...register("nappali")}
            defaultChecked={kivalasztottSzakAdatok?.nappali === 1}
          />
        }
        label="Nappali"
      />
    </>
  );
}

export default AdminSzakModosit;
