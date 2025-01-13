import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RegisztralasContext } from "../context/RegisztralasContext";
import useAuthContext from "../context/AuthContext";
import { Button, Form, InputGroup } from "react-bootstrap";

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
        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>Jelszó</InputGroup.Text>
            <Form.Control type="password" {...formRegister("password")} />
          </InputGroup>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>Jelszó megerősítés</InputGroup.Text>
            <Form.Control
              type="password"
              {...formRegister("confirmPassword")}
            />
          </InputGroup>
          {errors.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <Button
          className="align-self-center mt-4 w-50"
          type="submit"
          disabled={isSubmitting}
        >
          Regisztrálás
        </Button>
      </form>
    </section>
  );
}

export default RegisztralasForm;
