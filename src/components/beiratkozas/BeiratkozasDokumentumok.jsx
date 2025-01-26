import { useContext, useState } from "react";
import BeiratkozasContainer from "./BeiratkozasContainer";
import { DokumentumokContext } from "../../context/beiratkozas/DokumentumokContext";
import CustomDropzone from "../Dropzone/CustomDropzone";
import InputFile from "../InputFile";
import SubmitButton from "../SubmitButton";
import InfoBox from "../InfoBox";

function BeiratkozasDokumentumok({ isDisabled }) {
  const { dokumentumokFelvesz, register, handleSubmit, isSubmitting, errors } =
    useContext(DokumentumokContext);

  const inputResponsiveness =
    "w-[330px] xsm:min-w-[390px] sm:min-w-[430px] md:min-w-[450px] md:max-w-[500px] lg:max-w-[800px] ";

  return (
    <BeiratkozasContainer
      title={"Dokumentumok"}
      isOpen={false}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(dokumentumokFelvesz)}
    >
      <InputFile
        wrapperClassName={`!mt-3 ${inputResponsiveness}`}
        title="Adóigazolvány"
        formRegister={register("adoazonosito")}
        error={errors.adoazonosito}
      />

      <InputFile
        wrapperClassName={inputResponsiveness}
        title="TAJ kártya"
        formRegister={register("taj")}
        error={errors.taj}
      />

      <InputFile
        wrapperClassName={inputResponsiveness}
        title="Személyazonosító igazolvány első oldal"
        formRegister={register("szemelyi_elso")}
        error={errors.szemelyi_elso}
      />

      <InputFile
        wrapperClassName={inputResponsiveness}
        title="Személyazonosító igazolvány hátsó oldal"
        formRegister={register("szemelyi_hatso")}
        error={errors.szemelyi_hatso}
        multiple={true}
      />

      <InputFile
        wrapperClassName={inputResponsiveness}
        title="Lakcímet igazoló igazolvány első oldala"
        formRegister={register("lakcim_elso")}
        error={errors.lakcim_elso}
      />

      <InputFile
        wrapperClassName={inputResponsiveness}
        title="Lakcímet igazoló igazolvány hátsó oldala"
        formRegister={register("lakcim_hatso")}
        error={errors.lakcim_hatso}
      />

      <InputFile
        wrapperClassName={inputResponsiveness}
        title="Önarckép semleges háttérral"
        formRegister={register("onarckep")}
        error={errors.onarckep}
      />

      <div className={`w-full container ${inputResponsiveness}`}>
        <InfoBox buttonClassName={`pl-[14px]`}>
          Azoktól, akik idén májusban érettségiznek, pótlólag várjuk majd a
          bizonyítványt, de előzetesen ők is beiratkozhatnak.
        </InfoBox>
        <InputFile
          title="Érettségi bizonyítvány"
          formRegister={register("erettsegik")}
          error={errors.erettsegik}
          multiple={true}
        />
      </div>

      <SubmitButton
        text="Tovább"
        isSubmitting={isSubmitting}
        className="!mb-5 !mt-10 md:max-w-xs lg:mt-8"
      />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasDokumentumok;
