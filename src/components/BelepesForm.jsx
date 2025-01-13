import { useNavigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import { useContext } from "react";
import { BelepesContext } from "../context/BelepesContext";
import { Button, Form, InputGroup } from "react-bootstrap";

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
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>Email</InputGroup.Text>
            <Form.Control type="email" {...formRegister("email")} />
          </InputGroup>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>Jelszó</InputGroup.Text>
            <Form.Control type="password" {...formRegister("password")} />
          </InputGroup>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <Button
          className="align-self-center mt-4 w-50"
          type="submit"
          disabled={isSubmitting}
        >
          Belépés
        </Button>
      </form>
    </section>
  );
}

export default BelepesForm;
