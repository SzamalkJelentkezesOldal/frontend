import React from "react";
import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";

function AdminSzakModosit() {
  const { register } = useFormContext();

  return (
    <>
      <TextField
        {...register("elnevezes")}
        margin="dense"
        label="Elnevezés"
        fullWidth
        variant="outlined"
      />
      <FormControl margin="dense" fullWidth variant="outlined">
        <InputLabel>Portfólió</InputLabel>
        <Select label="Portfólió" {...register("portfolio")} defaultValue={false}>
          <MenuItem value={true}>Igen</MenuItem>
          <MenuItem value={false}>Nem</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="dense" fullWidth variant="outlined">
        <InputLabel>Tagozat</InputLabel>
        <Select label="Tagozat" {...register("nappali")} defaultValue={false}>
          <MenuItem value={true}>Nappali</MenuItem>
          <MenuItem value={false}>Esti</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}

export default AdminSzakModosit;
