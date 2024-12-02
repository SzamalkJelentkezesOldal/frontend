import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useContext, useRef, useState } from "react";
import { ApiContext } from "../../context/ApiContext";
import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Dropzone from "./Dropzone/Dropzone";
import "./Dropzone/dropzone.css";
import axios from "axios";
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
});

function Jelentkezes() {
  const { szakLista, postAdat } = useContext(ApiContext);
  const [portfolio, setPortfolio] = useState(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const szakokRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(jelentkezesSchema),
    defaultValues: {
      szakok: [],
    },
  });

  const kepElkuld = async (e) => {
    if (!files.length) return;
    const URL = process.env.REACT_APP_CLOUDINARY_URL;
    const uploaders = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("upload_preset", "testing");
      formData.append("api_key", "832529985323792");
      return axios.post(URL, formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
    });

    const results = await axios.all(uploaders);
    const uploadedImages = results.map((response) => response.data.secure_url);

    setImages(uploadedImages);
    return uploadedImages; // Visszaadja a képek URL-jeit
  };

  const jelentkezoFelvesz = async () => {
    let uploadedImages = [];

    const adatok = getValues(["nev", "email", "tel", "szakok"]);

    if (files.length) {
      uploadedImages = await kepElkuld();
    }

    const jelentkezoAdatok = {
      jelentkezo: { nev: adatok[0], email: adatok[1], tel: adatok[2] },
      jelentkezes: { kivalasztottSzakok: adatok[3] },
      portfolio: { images: uploadedImages },
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
    {
      if (event && event.length) {
        const needsPortfolio = event.some((item) => item.portfolio);
        setPortfolio(needsPortfolio);
      } else {
        setPortfolio(false);
      }
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
        <div className="mb-3">
          <Select
            ref={szakokRef}
            onChange={(e) => {
              selectAdatok(e);
              const szakok = e ? e.map((item) => item.value) : [];
              setValue("szakok", szakok);
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

        {portfolio ? (
          <>
            <Tooltip
              arrow
              title="Bizonyos szakokhoz kötelező a portfolió."
              slots={{
                transition: Zoom,
              }}
            >
              <p style={{ width: "fit-content", marginBottom: 0 }}>Portfolió</p>
            </Tooltip>
            <Dropzone setFiles={setFiles} files={files} />
          </>
        ) : (
          ""
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
