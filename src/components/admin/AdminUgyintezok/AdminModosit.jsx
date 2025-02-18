import { useContext } from "react";
import { AdminUgyintezoContext } from "../../../context/admin/AdminUgyintezoContext";
import InputText from "../../InputText";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

function AdminModosit({}) {
  const {
    handleUgyintezoAdatok,
    register,
    handleSubmit,
    isSubmitting,
    errors,
  } = useContext(AdminUgyintezoContext);

  return (
    <form onSubmit={handleSubmit(handleUgyintezoAdatok)}>
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

      <FormControlLabel control={<Checkbox />} label="Master" />
    </form>
  );
}

export default AdminModosit;
