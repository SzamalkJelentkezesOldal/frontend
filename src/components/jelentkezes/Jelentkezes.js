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

function Jelentkezes() {
  const { szakLista, postAdat } = useContext(ApiContext);
  const [kivalasztottSzakok, setKivalasztottSzakok] = useState([]);
  const [nev, setNev] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [portfolio, setPortfolio] = useState(false);
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const selectInputRef = useRef();

  function sikeresJelentkezes() {
    setNev("");
    setTel("");
    setEmail("");
    setPortfolio(false);
    setFiles([]);
    setImages([]);
    selectInputRef.current.clearValue();
  }

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

    if (files.length) {
      uploadedImages = await kepElkuld(); // Feltöltés, ha vannak fájlok
    }

    const jelentkezoAdatok = {
      jelentkezo: { nev, email, tel },
      jelentkezes: { kivalasztottSzakok },
      portfolio: { images: uploadedImages }, // Üres tömb, ha nincs feltöltött kép
    };

    postAdat("ujJelentkezo", jelentkezoAdatok);
    sikeresJelentkezes();
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
      setKivalasztottSzakok((elozolegKivalasztottSzakok) => {
        const jelenlegKivalasztottSzakok = [
          ...elozolegKivalasztottSzakok,
          event[event.length - 1].value,
        ];
        return jelenlegKivalasztottSzakok;
      });
    } else {
      setKivalasztottSzakok([]);
    }

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
      <div
        className="bg-light bg-gradient p-5 border border-2 rounded-3 d-flex flex-column"
        style={{ width: 500 + "px" }}
      >
        <div className="mb-3">
          <Select
            onChange={(e) => selectAdatok(e)}
            isMulti
            name="colors"
            ref={selectInputRef}
            options={szakOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Szakma kiválasztása..."
            noOptionsMessage={() => "Nincs találat"}
            required
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

        <InputGroup className="mb-3">
          <InputGroup.Text>Név</InputGroup.Text>
          <Form.Control
            placeholder="Róka rudi"
            value={nev}
            onChange={(evt) => setNev(evt.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>E-mail</InputGroup.Text>
          <Form.Control
            placeholder="rokarudi@gmail.com"
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Telefonszám</InputGroup.Text>
          <Form.Control
            type="tel"
            placeholder="06201234567"
            pattern="06[0-9]{9}"
            maxLength={11}
            value={tel}
            onChange={(evt) => setTel(evt.target.value)}
          />
        </InputGroup>

        <Button
          className="align-self-center mt-4 w-50"
          onClick={jelentkezoFelvesz}
        >
          Jelentkezés
        </Button>
      </div>
    </section>
  );
}

export default Jelentkezes;
