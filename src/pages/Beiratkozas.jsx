import { useContext, useState } from "react";
import BeiratkozasDokumentumok from "../components/beiratkozas/BeiratkozasDokumentumok";
import BeiratkozasMain from "../components/beiratkozas/BeiratkozasMain";
import BeiratkozasSorrend from "../components/beiratkozas/sorrend/BeiratkozasSorrend";
import BeiratkozasSzemelyesAdatok from "../components/beiratkozas/BeiratkozasSzemelyesAdatok";
import { BeiratkozasContext } from "../context/beiratkozas/BeiratkozasContext";
import { Button } from "@mantine/core";
import CustomSnackbar from "../components/CustomSnackbar";

function Beiratkozas() {
  const {
    stepperActive,
    allapotLoading,
    modositasraVar,
    modositasVegrehajtas,
    modositasLoading,
  } = useContext(BeiratkozasContext);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleModositasClick = async () => {
    try {
      const success = await modositasVegrehajtas();
      if (success) {
        setSnackbarMessage("Módosítás sikeresen végrehajtva!");
        setSnackbarSuccess(true);
      } else {
        setSnackbarMessage("Sikertelen módosítás!");
        setSnackbarSuccess(false);
      }
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage("Hiba történt a módosítás során!");
      setSnackbarSuccess(false);
      setSnackbarOpen(true);
    }
  };

  if (allapotLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className=" min-h-[100vh] screen w-screen">
      <BeiratkozasMain currentActive={stepperActive} />
      <div className="lg:container bg-gray-50 min-h-[100vh] border-x-2 border-gray-300/50 shadow-md pb-10 !max-w-[1000px]">
        {modositasraVar && (
          <div className=" pt-36 xsm:pt-[7.5rem]">
            <div className="flex justify-between items-center p-5 bg-yellow-400/90">
              <h3 className="text-lg tracking-wide">
                Sikeres módosítás esetén kattints a gombra!
              </h3>
              <Button
                onClick={handleModositasClick}
                className="bg-yellow-700 text-black hover:bg-yellow-800"
                type="button"
                disabled={modositasLoading}
              >
                {modositasLoading ? "Folyamatban..." : "Módosítás kész"}
              </Button>
            </div>
          </div>
        )}
        <div>
          <BeiratkozasSzemelyesAdatok isCompleted={stepperActive > 0} />
        </div>
        <div>
          <BeiratkozasDokumentumok
            isDisabled={stepperActive < 1}
            isCompleted={stepperActive > 1}
          />
        </div>
        <div>
          <BeiratkozasSorrend
            isDisabled={stepperActive < 2}
            isCompleted={stepperActive > 2}
          />
        </div>
      </div>

      <CustomSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        severity={snackbarSuccess}
        msg={snackbarMessage}
      />
    </div>
  );
}

export default Beiratkozas;
