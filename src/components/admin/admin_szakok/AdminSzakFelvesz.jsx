import React, { useContext } from "react";
import { AdminSzakFelveszContext } from "../../../context/admin/AdminSzakFelveszContext";
import CustomForm from "../../CustomForm";
import InputText from "../../InputText";
import SubmitButton from "../../SubmitButton";
import { FormControl, Select, MenuItem, Typography } from "@mui/material";

const AdminSzakFelvesz = () => {
  const { formRegister, handleSubmit, szakFelvesz, errors, isSubmitting } =
    useContext(AdminSzakFelveszContext);

  return (
    <section className="w-full pt-20">
      <CustomForm
        onSubmit={handleSubmit(szakFelvesz)}
        title="Szak felvétel"
        className={"!min-w-[40%] flex flex-wrap gap-2"}
      >
        <InputText
          formRegister={formRegister("elnevezes")}
          label="Elnevezés"
          error={errors.elnevezes}
          type="text"
        />
        <Typography variant="subtitle1" gutterBottom>
          Portfólió
        </Typography>
        <FormControl fullWidth>
          <Select
            {...formRegister("portfolio")}
            defaultValue=""
            error={!!errors.portfolio}
          >
            <MenuItem value="">
              <em>Válassz</em>
            </MenuItem>
            <MenuItem value="Igen">Igen</MenuItem>
            <MenuItem value="Nem">Nem</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="subtitle1" gutterBottom>
          Tagozat
        </Typography>
        <FormControl fullWidth>
          <Select
            {...formRegister("tagozat")}
            defaultValue=""
            error={!!errors.tagozat}
          >
            <MenuItem value="">
              <em>Válassz</em>
            </MenuItem>
            <MenuItem value="Nappali">Nappali</MenuItem>
            <MenuItem value="Esti">Esti</MenuItem>
          </Select>
        </FormControl>
        <SubmitButton isSubmitting={isSubmitting} text="Szak felvétele" />
      </CustomForm>
    </section>
  );
};

export default AdminSzakFelvesz;