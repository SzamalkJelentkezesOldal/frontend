import { useContext } from "react";
import InputText from "../InputText";
import BeiratkozasContainer from "./BeiratkozasContainer";
import { DokumentumokContext } from "../../context/beiratkozas/DokumentumokContext";

function BeiratkozasDokumentumok({ isDisabled }) {
  const { dokumentumokFelvesz, register, handleSubmit, isSubmitting, errors } =
    useContext(DokumentumokContext);

  return (
    <BeiratkozasContainer
      title={"Dokumentumok"}
      isOpen={false}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(dokumentumokFelvesz)}
    >
      <InputText
        formRegister={register("adoazonosito")}
        label="Adóigazolvány"
        error={errors.adoazonosito}
        type="file"
      />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasDokumentumok;
