import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../context/admin/AdminContext";
import { AdminBelepesContext } from "../../context/admin/AdminBelepesContext";
import InputText from "../InputText";
import SubmitButton from "../SubmitButton";
import CustomForm from "../CustomForm";

function AdminBelepes() {
  const navigate = useNavigate();

  const { login } = useContext(AdminContext);

  const { handleSubmit, isSubmitting, errors, reset, getValues, formRegister } =
    useContext(AdminBelepesContext);

  const handleLogin = async () => {
    try {
      const email = getValues("email");
      const password = getValues("password");

      await login({ email, jelszo: password });
      reset();
      navigate("/");
    } catch (e) {
      console.log("bejelentkezési hiba");
    }
  };
  return (
    <section className="w-full pt-20">
      <CustomForm onSubmit={handleSubmit(handleLogin)} title="Belépés">
        <InputText
          formRegister={formRegister("email")}
          label="Email"
          error={errors.email}
          type="email"
        />

        <InputText
          formRegister={formRegister("password")}
          label="Jelszó"
          error={errors.password}
          type="password"
          password="true"
        />

        <SubmitButton text="Belépés" isSubmitting={isSubmitting} />
      </CustomForm>
    </section>
  );
}

export default AdminBelepes;
