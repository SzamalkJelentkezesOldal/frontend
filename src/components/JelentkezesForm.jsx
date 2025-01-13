import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, { useContext } from "react";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { JelentkezesContext } from "../context/JelentkezesContext";
import CustomSelect from "./CustomSelect";

function JelentkezesForm() {
  const {
    szakOptions,
    selectAdatok,
    jelentkezoFelvesz,
    register,
    handleSubmit,
    portfolio,
    portfoliosSzakok,
    isSubmitting,
    errors,
    szakokRef,
  } = useContext(JelentkezesContext);

  return (
    <section
      className="container-fluid d-flex justify-content-center align-items-center "
      style={{ padding: 10 + "vh" }}
    >
      <form
        onSubmit={handleSubmit(jelentkezoFelvesz)}
        className="bg-light bg-gradient p-5 border border-2 rounded-3 d-flex flex-column"
        style={{ width: 500 + "px" }}
      >
        <div className="mb-3">
          <CustomSelect
            ref={szakokRef}
            onChange={(e) => {
              selectAdatok(e);
            }}
            options={szakOptions}
            placeholder="Szakma kiválasztása..."
          />
          <p className="lead" style={{ fontSize: 13 + "px", marginBottom: 0 }}>
            N = Nappali | E = Esti
          </p>
          {errors.szakok && (
            <span className="text-danger">{errors.szakok.message}</span>
          )}
        </div>

        {portfolio && portfoliosSzakok.length > 0 && (
          <div>
            {portfoliosSzakok.map((szak, index) => (
              <InputGroup key={szak} className="mb-3">
                <InputGroup.Text>
                  <Tooltip
                    arrow
                    title="Bizonyos szakokhoz kötelező a portfolió link."
                    slots={{
                      transition: Zoom,
                    }}
                  >
                    <p style={{ width: "fit-content", marginBottom: 0 }}>
                      {szakOptions.find((opt) => opt.value === szak)?.label ||
                        "Portfolió"}
                    </p>
                  </Tooltip>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Portfólió link"
                  {...register(`portfolioSzakok.${index}.portfolio_url`, {
                    shouldUnregister: true,
                  })}
                />
              </InputGroup>
            ))}
          </div>
        )}

        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>Név</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Róka rudi"
              {...register("nev")}
            />
          </InputGroup>
          {errors.nev && (
            <span className="text-danger">{errors.nev.message}</span>
          )}
        </div>

        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>E-mail</InputGroup.Text>
            <Form.Control
              placeholder="rokarudi@gmail.com"
              type="email"
              {...register("email")}
            />
          </InputGroup>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-3">
          <InputGroup>
            <InputGroup.Text>Telefonszám</InputGroup.Text>
            <Form.Control
              {...register("tel")}
              type="tel"
              placeholder="06201234567"
              pattern="06[0-9]{9}"
              maxLength={11}
            />
          </InputGroup>
          {errors.tel && (
            <span className="text-danger">{errors.tel.message}</span>
          )}
        </div>

        <Button
          className="align-self-center mt-4 w-50"
          type="submit"
          disabled={isSubmitting}
        >
          Jelentkezés
        </Button>
      </form>
    </section>
  );
}

export default JelentkezesForm;
