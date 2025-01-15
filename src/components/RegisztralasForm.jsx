import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RegisztralasContext } from "../context/RegisztralasContext";
import useAuthContext from "../context/AuthContext";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";
import CustomForm from "./CustomForm";

function RegisztralasForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const { handleSubmit, isSubmitting, errors, reset, getValues, formRegister } =
    useContext(RegisztralasContext);

  const handleRegister = async () => {
    const password = getValues("password");
    const confirmPassword = getValues("confirmPassword");

    try {
      await register(
        { password, password_confirmation: confirmPassword },
        token
      );
      reset();
      navigate("/beiratkozas");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section
      className="container-fluid d-flex justify-content-center align-items-center "
      style={{ padding: 10 + "vh" }}
    >
      <CustomForm onSubmit={handleSubmit(handleRegister)} title="Regisztráció">
        <InputText
          formRegister={formRegister("password")}
          label="Jelszó"
          error={errors.password}
          type="password"
        />
        <InputText
          formRegister={formRegister("confirmPassword")}
          label="Jelszó megerősítés"
          error={errors.confirmPassword}
          type="password"
        />
        <SubmitButton isSubmitting={isSubmitting} text="Regisztráció" />
      </CustomForm>
    </section>
  );
}

export default RegisztralasForm;
