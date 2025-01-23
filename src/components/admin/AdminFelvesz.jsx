import { useContext } from "react";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import CustomForm from "../CustomForm";
import { AdminFelveszContext } from "../../context/admin/AdminFelveszContext";
import { Checkbox, FormControlLabel } from "@mui/material";
import AdminTablazat from "./AdminTablazat";

function AdminFelvesz() {
  const { handleSubmit, isSubmitting, errors, formRegister, ugyintezoFelvesz } =
    useContext(AdminFelveszContext);

  return (
    <section className="w-full pt-20">
      <CustomForm
        onSubmit={handleSubmit(ugyintezoFelvesz)}
        title="Ügyintéző felvétel"
        className={"!min-w-[40%] flex flex-wrap gap-2"}
      >
        <InputText
          formRegister={formRegister("nev")}
          label="Név"
          error={errors.nev}
          type="text"
        />
        <InputText
          formRegister={formRegister("email")}
          label="E-mail"
          error={errors.email}
          type="text"
        />
        <InputText
          formRegister={formRegister("jelszo")}
          label="Jelszó"
          error={errors.jelszo}
          type="password"
          password={true}
        />
        <InputText
          formRegister={formRegister("jelszoMegerosites")}
          label="Jelszó megerősítés"
          error={errors.jelszoMegerosites}
          type="password"
          password={true}
        />
        <FormControlLabel
          control={
            <Checkbox {...formRegister("master")} defaultChecked={false} />
          }
          label="Master"
          labelPlacement="bottom"
        />
        <SubmitButton isSubmitting={isSubmitting} text="Ügyintéző felvétele" />
      </CustomForm>
    </section>
  );
}

export default AdminFelvesz;
