import { createContext, useRef, useState } from "react";

export const BeiratkozasContext = createContext("");

export const BeiratkozasProvider = ({ children }) => {
  const [postStatus, setPostStatus] = useState(false);
  const [stepperActive, setStepperActive] = useState(0);
  const [allapotLoading, setAllapotLoading] = useState(false);
  const [modositasraVar, setModositasraVar] = useState(false);
  const [jelentkezoEmail, setJelentkezoEmail] = useState("");
  const emailRef = useRef("");

  const setEmail = (email) => {
    emailRef.current = email;
    setJelentkezoEmail(email);
  };

  function modositasVegrehajtas() {
    console.log(emailRef.current);
    setModositasraVar(false);
  }

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
        setJelentkezoEmail: setEmail,
        modositasVegrehajtas,
      }}
    >
      {children}
    </BeiratkozasContext.Provider>
  );
};
