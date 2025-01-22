import { useContext, useState } from "react";
import InputText from "../InputText";
import BeiratkozasContainer from "./BeiratkozasContainer";
import { DokumentumokContext } from "../../context/beiratkozas/DokumentumokContext";
import CustomDropzone from "../Dropzone/CustomDropzone";
import InputFile from "../InputFile";

function BeiratkozasDokumentumok({ isDisabled }) {
  const { dokumentumokFelvesz, register, handleSubmit, isSubmitting, errors } =
    useContext(DokumentumokContext);

  const [szemelyi, setSzemelyi] = useState([]);

  return (
    <BeiratkozasContainer
      title={"Dokumentumok"}
      isOpen={false}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(dokumentumokFelvesz)}
    >
      <InputFile
        title={"Személyi igazolvány első oldala"}
        formRegister={register("adoazonosito")}
        label="Adóigazolvány"
        error={errors.adoazonosito}
      />

      <CustomDropzone setFiles={setSzemelyi} files={szemelyi} />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasDokumentumok;
