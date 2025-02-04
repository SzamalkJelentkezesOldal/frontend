import { useContext } from "react";
import BeiratkozasContainer from "./BeiratkozasContainer";
import { SzemelyesAdatokContext } from "../../context/beiratkozas/SzemelyesAdatokContext";
import SubmitButton from "../SubmitButton";
import InputText from "../InputText";

function BeiratkozasSzemelyesAdatok({ isCompleted }) {
  const {
    handleSzemelyesAdatok,
    register,
    handleSubmit,
    isSubmitting,
    errors,
    magyar,
    adatokEdit,
    editLoading,
  } = useContext(SzemelyesAdatokContext);

  const inputResponsiveness =
    "min-w-[250px] xsm:min-w-[390px] sm:min-w-[430px] md:min-w-[450px] md:max-w-[450px] lg:min-w-[380px] lg:max-w-[380px] xl:max-w-[300px]";

  return (
    <BeiratkozasContainer
      title={"Személyes Adatok"}
      first={true}
      isOpen={false}
      onSubmit={handleSubmit(handleSzemelyesAdatok)}
      isCompleted={isCompleted}
      handleEdit={adatokEdit}
      editLoading={editLoading}
    >
      <div className="flex flex-col sm:max-w-[768px] sm:items-center  lg:max-w-[1279px] lg:w-full lg:grid lg:grid-cols-2 lg:justify-items-center lg:pt-6 lg:px-10 gap-y-4 ">
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
          formRegister={register("lakcim")}
          label="Állandó lakcím"
          error={errors.lakcim}
          type="text"
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
      {isCompleted ? (
        <SubmitButton
          text="Módosítás"
          isSubmitting={isSubmitting}
          className="!mb-5 md:max-w-xs lg:mt-8"
        />
      ) : (
        <SubmitButton
          text="Tovább"
          isSubmitting={isSubmitting}
          className="!mb-5 md:max-w-xs lg:mt-8"
        />
      )}
    </BeiratkozasContainer>
  );
}

export default BeiratkozasSzemelyesAdatok;
