import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

function AdminSzakModosit() {
  const { register, watch } = useFormContext();

  return (
    <>
      <TextField
        {...register("elnevezes")}
        margin="dense"
        label="Elnevezés"
        fullWidth
        variant="outlined"
        value={watch("elnevezes") || ""}
      />
      <FormControl margin="dense" fullWidth variant="outlined">
        <InputLabel>Portfólió</InputLabel>
        <Select
          label="Portfólió"
          {...register("portfolio")}
          value={watch("portfolio") ? "1" : "0"}
        >
          <MenuItem value="1">Igen</MenuItem>
          <MenuItem value="0">Nem</MenuItem>
        </Select>
      </FormControl>
      <FormControl margin="dense" fullWidth variant="outlined">
        <InputLabel>Tagozat</InputLabel>
        <Select
          label="Tagozat"
          {...register("nappali")}
          value={watch("nappali") ? "1" : "0"}
        >
          <MenuItem value="1">Nappali</MenuItem>
          <MenuItem value="0">Esti</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
 export default AdminSzakModosit;