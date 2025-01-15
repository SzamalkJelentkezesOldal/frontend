import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RegisztralasContext } from "../context/RegisztralasContext";
import useAuthContext from "../context/AuthContext";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";

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
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="bg-light bg-gradient p-5 border border-2 rounded-3 d-flex flex-column"
        style={{ width: 500 + "px" }}
      >
        <InputText
          formRegister={register("password")}
          label="Jelszó"
          error={errors.password}
          type="password"
        />

        <InputText
          formRegister={register("confirmPassword")}
          label="Jelszó megerősítés"
          error={errors.confirmPassword}
          type="confirmPassword"
        />

        <SubmitButton isSubmitting={isSubmitting} text="Regisztráció" />
      </form>
    </section>
  );
}

export default RegisztralasForm;
