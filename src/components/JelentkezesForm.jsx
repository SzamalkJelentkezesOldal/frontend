import React, { useContext } from "react";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { JelentkezesContext } from "../context/JelentkezesContext";
import CustomSelect from "./CustomSelect";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";

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
    <section className="container w-full h-screen ">
      <form
        onSubmit={handleSubmit(jelentkezoFelvesz)}
        className="container min-w-[380px] pl-5 pr-7 pt-20 bg-gray-100/60 border-2 border-gray-200/80 rounded-lg shadow-sm h-screen sm:h-auto sm:p-12 sm:max-w-[640px] sm:mt-20"
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
            <span className="text-szSecondary-200">
              {errors.szakok.message}
            </span>
          )}
        </div>

        {portfolio && portfoliosSzakok.length > 0 && (
          <div>
            {portfoliosSzakok.map((szak, index) => (
              <Tooltip
                key={index}
                arrow
                title="Bizonyos szakokhoz kötelező a portfolió link."
                slots={{
                  transition: Zoom,
                }}
                placement="bottom-start"
              >
                <div>
                  <InputText
                    key={index}
                    formRegister={
                      (`portfolioSzakok.${index}.portfolio_url`,
                      {
                        shouldUnregister: true,
                      })
                    }
                    type="text"
                    error={errors.portfolioSzakok?.[index]?.portfolio_url}
                    label={szakOptions.find((opt) => opt.value === szak)?.label}
                  />
                </div>
              </Tooltip>
            ))}
          </div>
        )}

        <InputText
          formRegister={register("nev")}
          label="Név"
          error={errors.nev}
          type="text"
        />

        <InputText
          formRegister={register("email")}
          label="Email"
          error={errors.email}
          type="email"
        />

        <InputText
          formRegister={register("tel")}
          label="Telefonszám"
          error={errors.tel}
          type="tel"
        />

        <SubmitButton text="Jelentkezés" isSubmitting={isSubmitting} />
      </form>
    </section>
  );
}

export default JelentkezesForm;
