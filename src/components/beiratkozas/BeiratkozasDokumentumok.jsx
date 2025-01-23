import { useContext, useState } from "react";
import BeiratkozasContainer from "./BeiratkozasContainer";
import { DokumentumokContext } from "../../context/beiratkozas/DokumentumokContext";
import CustomDropzone from "../Dropzone/CustomDropzone";
import InputFile from "../InputFile";
import SubmitButton from "../SubmitButton";

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
        title="Lakcímet igazoló igazolvány hátsó oldala"
        formRegister={register("adoazonosito")}
        error={errors.adoazonosito}
        multiple={true}
      />

      {/* <CustomDropzone setFiles={setSzemelyi} files={szemelyi} /> */}

      <SubmitButton
        text="Tovább"
        isSubmitting={isSubmitting}
        className="!mb-5 md:max-w-xs lg:mt-8"
      />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasDokumentumok;
