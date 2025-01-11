import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useContext, useRef, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const jelentkezesSchema = z.object({
  email: z.string().email("Érvénytelen e-mail cím!"),
  nev: z.string().min(1, "A név megadása kötelező!"),
  tel: z
    .string()
    .length(11, "A telefonszámnak 11 karakter hosszúnak kell lennie!"),
  szakok: z.array(z.number()).min(1, "Legalább egy szakot ki kell választani!"),
  portfolioSzakok: z
    .array(
      z.object({
        szak_id: z.number(),
        portfolio_url: z.string().url("Érvénytelen URL!"),
      })
    )
    .optional(),
});

function Jelentkezes() {
  const { szakLista, postAdat } = useContext(ApiContext);
  const [portfolio, setPortfolio] = useState(false);
  const [portfoliosSzakok, setPortfoliosSzakok] = useState([]);
  const szakokRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(jelentkezesSchema),
    defaultValues: {
      szakok: [],
    },
  });

  const jelentkezoFelvesz = async () => {
    const adatok = getValues([
      "nev",
      "email",
      "tel",
      "szakok",
      "portfolioSzakok",
    ]);

    console.log(adatok);

    const jelentkezoAdatok = {
      jelentkezo: { nev: adatok[0], email: adatok[1], tel: adatok[2] },
      jelentkezes: { kivalasztottSzakok: adatok[3] },
      portfolio: { portfolioSzakok: adatok[4] },
    };

    postAdat("ujJelentkezo", jelentkezoAdatok);
    reset();
    szakokRef.current.clearValue(); // mivel a react-select nem kompatibilis a react-hook-formos reset()-el
  };

  function szakListaOptions() {
    const szakOptions = [];
    szakLista.map((szak) => {
      return szakOptions.push({
        value: szak.id,
        label: szak.elnevezes,
        portfolio: szak.portfolio,
      });
    });
    return szakOptions;
  }

  function selectAdatok(event) {
    if (event && event.length) {
      const selectedSzakok = event.map((item) => item.value);
      setValue("szakok", selectedSzakok);

      const selectedPortfolios = event.filter((item) => item.portfolio);

      // Előző portfólió adatok megőrzése
      const currentPortfolioSzakok = watch("portfolioSzakok") || [];
      const updatedPortfolioSzakok = selectedPortfolios.map((item) => {
        // Ellenőrizzük, hogy van-e már adat az adott szakhoz
        const existingPortfolio = currentPortfolioSzakok.find(
          (portfolio) => portfolio?.szak_id === item.value
        );
        return (
          existingPortfolio || {
            szak_id: item.value,
            portfolio_url: "",
          }
        );
      });

      setValue("portfolioSzakok", updatedPortfolioSzakok);

      setPortfoliosSzakok(selectedPortfolios.map((item) => item.value));
      setPortfolio(selectedPortfolios.length > 0);
    } else {
      setPortfolio(false);
      setValue("szakok", []);
      setValue("portfolioSzakok", []);
    }
  }

  const szakOptions = szakListaOptions();
  const animatedComponents = makeAnimated();

  return (
    <section
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ padding: 10 + "vh" }}
    >
      <form
        onSubmit={handleSubmit(jelentkezoFelvesz)}
        className="bg-light bg-gradient p-5 border border-2 rounded-3 d-flex flex-column"
        style={{ width: 500 + "px" }}
      >
        <pre>{JSON.stringify(watch(), null, 2)}</pre>

        <div className="mb-3">
          <Select
            ref={szakokRef}
            onChange={(e) => {
              selectAdatok(e);
            }}
            isMulti
            name="colors"
            options={szakOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Szakma kiválasztása..."
            noOptionsMessage={() => "Nincs találat"}
            components={animatedComponents}
            styles={{
              valueContainer: (baseStyles) => ({
                ...baseStyles,
                maxHeight: "100px",
                overflowY: "auto",
              }),
            }}
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

export default Jelentkezes;
