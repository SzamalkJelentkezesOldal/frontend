import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useContext } from "react";
import { BelepesContext } from "../context/BelepesContext";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";
import CustomForm from "./CustomForm";

function BelepesForm() {
  const navigate = useNavigate();

  const { login } = useAuthContext();

  const { handleSubmit, isSubmitting, errors, reset, getValues, formRegister } =
    useContext(BelepesContext);

  const handleLogin = async () => {
    try {
      const email = getValues("email");
      const password = getValues("password");

      await login({ email, password });
      reset();
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

export default BelepesForm;
