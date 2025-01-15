import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useContext } from "react";
import { BelepesContext } from "../context/BelepesContext";
import { Button, Form, InputGroup } from "react-bootstrap";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";

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
      navigate("/");
    } catch (e) {
      console.log("bejelentkezési hiba");
    }
  };

  return (
    <section
      className="container-fluid d-flex justify-content-center align-items-center "
      style={{ padding: 10 + "vh" }}
    >
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-light bg-gradient p-5 border border-2 rounded-3 d-flex flex-column"
        style={{ width: 500 + "px" }}
      >
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
        />

        <SubmitButton text="Belépés" isSubmitting={isSubmitting} />
      </form>
    </section>
  );
}

export default BelepesForm;
