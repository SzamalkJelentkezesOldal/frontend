import { createContext, useContext } from "react";
import { AuthContext } from "../AuthContext";

export const BeiratkozasContext = createContext("");

export const BeiratkozasProvider = ({ children }) => {
  const {
    postStatus,
    stepperActive,
    setStepperActive,
    allapotLoading,
    setAllapotLoading,
    modositasraVar,
    setModositasraVar,
    jelentkezoEmail,
    setJelentkezoEmail,
    modositasVegrehajtas,
    modositasLoading,
  } = useContext(AuthContext);

  return (
    <BeiratkozasContext.Provider
      value={{
        postStatus,
        stepperActive,
        setStepperActive,
        setAllapotLoading,
        allapotLoading,
        modositasraVar,
        setModositasraVar,
        setJelentkezoEmail,
        modositasVegrehajtas,
        jelentkezoEmail,
        modositasLoading,
      }}
    >
      {children}
    </BeiratkozasContext.Provider>
  );
};
