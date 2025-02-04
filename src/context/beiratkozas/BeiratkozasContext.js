import { createContext, useState } from "react";
import { myAxios } from "../MyAxios";

export const BeiratkozasContext = createContext("");

export const BeiratkozasProvider = ({ children }) => {
  const [postStatus, setPostStatus] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [stepperActive, setStepperActive] = useState(0);
  const [allapotLoading, setAllapotLoading] = useState(false);

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const beiratkozasFelvesz = async () => {
    const beiratkozasAdatok = {
      //   beiratkozas: { nev: adatok[0], email: adatok[1], tel: adatok[2] },
      //   jelentkezes: { kivalasztottSzakok: adatok[3] },
      //   portfolio: { portfolioSzakok: adatok[4] },
    };

    const result = await postBeiratkozas(beiratkozasAdatok);
  };

  const postBeiratkozas = async (data) => {
    try {
      const response = await myAxios.post("/api/ujJelentkezo", data);
      console.log(response);
      if (response.status === 201) {
        setPostStatus(true);
        setSnackbarOpen(true);
      }
      return true;
    } catch (e) {
      console.log(e.response.data.errors);
      setPostStatus(false);
      setSnackbarOpen(true);
      return false;
    }
  };

  return (
    <BeiratkozasContext.Provider
      value={{
        postStatus,
        beiratkozasFelvesz,
        handleSnackbarClose,
        snackbarOpen,
        stepperActive,
        setStepperActive,
        setAllapotLoading,
        allapotLoading,
      }}
    >
      {children}
    </BeiratkozasContext.Provider>
  );
};
