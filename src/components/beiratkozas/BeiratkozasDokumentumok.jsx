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

  // "adoazonosito",
  //       "taj",
  //       "szemelyi_elso",
  //       "szemelyi_hatso",
  //       "lakcim_elso",
  //       "lakcim_hatso",
  //       "erettsegik",
  //       "tanulmanyik",
  //       "specialisok",

  return (
    <BeiratkozasContainer
      title={"Dokumentumok"}
      isOpen={false}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(dokumentumokFelvesz)}
    >
      <InputFile
        wrapperClassName="!mt-3"
        title="Adóigazolvány"
        formRegister={register("adoazonosito")}
        error={errors.adoazonosito}
        multiple={false}
      />

      <InputFile
        wrapperClassName="!mt-3"
        title="TAJ kártya"
        formRegister={register("taj")}
        error={errors.taj}
        multiple={false}
      />

      <InputFile
        title="Személyazonosító igazolvány első oldal"
        formRegister={register("szemelyi_elso")}
        error={errors.szemelyi_elso}
        multiple={true}
      />

      <InputFile
        title="Személyazonosító igazolvány hátsó oldal"
        formRegister={register("szemelyi_hatso")}
        error={errors.szemelyi_hatso}
        multiple={true}
      />

      <InputFile
        title="Lakcímet igazoló igazolvány első oldala"
        formRegister={register("lakcim_elso")}
        error={errors.lakcim_elso}
        multiple={true}
      />

      <InputFile
        title="Lakcímet igazoló igazolvány hátsó oldala"
        formRegister={register("lakcim_hatso")}
        error={errors.lakcim_hatso}
        multiple={true}
      />

      <SubmitButton
        text="Tovább"
        isSubmitting={isSubmitting}
        className="!mb-5 !mt-10 md:max-w-xs lg:mt-8"
      />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasDokumentumok;
