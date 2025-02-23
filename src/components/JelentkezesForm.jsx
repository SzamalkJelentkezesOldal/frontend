import React, { useContext } from "react";
import Zoom from "@mui/material/Zoom";
import Tooltip from "@mui/material/Tooltip";
import { JelentkezesContext } from "../context/JelentkezesContext";
import CustomSelect from "./CustomSelect";
import InputText from "./InputText";
import SubmitButton from "./SubmitButton";
import CustomForm from "./CustomForm";
import CustomSnackbar from "./CustomSnackbar";
import InfoBox from "./InfoBox";

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
    handleSnackbarClose,
    snackbarOpen,
    postStatus,
  } = useContext(JelentkezesContext);

  return (
    <section className="w-full pt-20">
      <CustomForm
        onSubmit={handleSubmit(jelentkezoFelvesz)}
        title="Jelentkezés"
      >
        <div className="mb-3">
          <CustomSelect
            ref={szakokRef}
            onChange={(e) => {
              selectAdatok(e);
            }}
            options={szakOptions}
            placeholder="Szakma kiválasztása..."
            isMulti={true}
          />
          <p
            className="text-szPrimary font-semibold px-1"
            style={{ fontSize: 13 + "px", marginBottom: 0 }}
          >
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
            <InfoBox>
              Kiválasztottál egy olyan képzést, amihez portfóliót kell
              elküldeni. Kérlek, az egész portfóliódat egy linkben küldd el.
            </InfoBox>
            {portfoliosSzakok.map((szak, index) => (
              <Tooltip
                key={`tooltip-${index}`}
                arrow
                title="Bizonyos szakokhoz kötelező a portfólió link."
                slots={{
                  transition: Zoom,
                }}
                placement="bottom-start"
              >
                <div>
                  <InputText
                    key={`input-${index}`}
                    formRegister={`portfolioSzakok.${index}.portfolio_url`}
                    type="text"
                    error={
                      errors?.portfolioSzakok?.[index]?.portfolio_url || null
                    }
                    label={
                      szakOptions.find((opt) => opt.value === szak)?.label ||
                      "Ismeretlen szak"
                    }
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

        <div className="pb-5 sm:pb-0 flex justify-center">
          <SubmitButton text="Jelentkezés" isSubmitting={isSubmitting} />
        </div>

        <CustomSnackbar
          severity={postStatus}
          open={snackbarOpen}
          msg={
            postStatus
              ? "Sikeres jelentkezés! E-Mail elküldve."
              : "Sikertelen jelentkezés!"
          }
          handleClose={handleSnackbarClose}
        />
      </CustomForm>
    </section>
  );
}

export default JelentkezesForm;
