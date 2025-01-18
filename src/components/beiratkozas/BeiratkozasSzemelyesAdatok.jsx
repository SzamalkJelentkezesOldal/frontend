import { useContext } from "react";
import BeiratkozasContainer from "./BeiratkozasContainer";
import { SzemelyesAdatokContext } from "../../context/beiratkozas/SzemelyesAdatokContext";
import SubmitButton from "../SubmitButton";
import InputText from "../InputText";

function BeiratkozasSzemelyesAdatok() {
  const {
    szemelyesAdatokFelvesz,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    magyar,
  } = useContext(SzemelyesAdatokContext);

  const inputResponsiveness =
    "min-w-[330px] xsm:min-w-[390px] sm:min-w-[430px] md:min-w-[450px] lg:min-w-[380px] lg:max-w-[380px] xl:min-w-[450px]";

  return (
    <BeiratkozasContainer
      title={"Személyes Adatok"}
      first={true}
      isOpen={false}
      onSubmit={handleSubmit(szemelyesAdatokFelvesz)}
    >
      <div className="flex flex-col sm:max-w-[768px] sm:items-center  lg:max-w-[1279px] lg:w-full lg:grid lg:grid-cols-2 lg:justify-items-center lg:pt-6 lg:px-10 gap-y-4">
        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("vezeteknev")}
          label="Vezetéknév"
          error={errors.vezeteknev}
          type="text"
        />
        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("keresztnev")}
          label="Keresztnév"
          error={errors.keresztnev}
          type="text"
        />
        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("szuletesi_nev")}
          label="Születési név (opcionális)"
          error={errors.szuletesi_nev}
          type="text"
        />

        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("anyja_neve")}
          label="Anyja leánykori neve"
          error={errors.anyja_neve}
          type="text"
        />

        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("szulo_elerhetoseg")}
          label="Szülők elérhetősége (telefonszáma)"
          error={errors.szulo_elerhetoseg}
          type="tel"
        />

        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("szuletesi_hely")}
          label="Születési hely"
          error={errors.szuletesi_hely}
          type="text"
        />

        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("szuletesi_datum")}
          label="Születési dátum"
          error={errors.szuletesi_datum}
          type="date"
        />

        <InputText
          wrapperClassName={inputResponsiveness}
          formRegister={register("allampolgarsag")}
          label="Állampolgárság"
          error={errors.allampolgarsag}
          type="text"
        />
        {magyar ? (
          <>
            <InputText
              wrapperClassName={inputResponsiveness}
              formRegister={register("adoazonosito")}
              label="Adóazonosító"
              error={errors.adoazonosito}
              type="text"
            />
            <InputText
              wrapperClassName={inputResponsiveness}
              formRegister={register("taj_szam")}
              label="TAJ szám"
              error={errors.taj_szam}
              type="text"
            />
          </>
        ) : null}
      </div>
      <SubmitButton
        text="Tovább"
        isSubmitting={isSubmitting}
        className="!mb-5 md:max-w-xs lg:mt-8"
      />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasSzemelyesAdatok;
