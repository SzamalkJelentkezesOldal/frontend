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

  return (
    <BeiratkozasContainer
      title={"Személyes Adatok"}
      first={true}
      isOpen={false}
      onSubmit={handleSubmit(szemelyesAdatokFelvesz)}
    >
      <InputText
        formRegister={register("vezeteknev")}
        label="Vezetéknév"
        error={errors.vezeteknev}
        type="text"
      />
      <InputText
        formRegister={register("keresztnev")}
        label="Keresztnév"
        error={errors.keresztnev}
        type="text"
      />
      <InputText
        formRegister={register("szuletesi_nev")}
        label="Születési név (opcionális)"
        error={errors.szuletesi_nev}
        type="text"
      />
      <InputText
        formRegister={register("anyja_neve")}
        label="Anyja leánykori neve"
        error={errors.anyja_neve}
        type="text"
      />
      <InputText
        formRegister={register("allampolgarsag")}
        label="Állampolgárság"
        error={errors.allampolgarsag}
        type="text"
      />
      {magyar ? (
        <>
          <InputText
            formRegister={register("adoazonosito")}
            label="Adóazonosító"
            error={errors.adoazonosito}
            type="text"
          />
          <InputText
            formRegister={register("taj_szam")}
            label="TAJ szám"
            error={errors.taj_szam}
            type="text"
          />
        </>
      ) : null}

      <InputText
        formRegister={register("szuletesi_hely")}
        label="Születési hely"
        error={errors.szuletesi_hely}
        type="text"
      />

      <InputText
        formRegister={register("szuletesi_datum")}
        label="Születési dátum"
        error={errors.szuletesi_datum}
        type="date"
      />

      <InputText
        formRegister={register("szulo_elerhetoseg")}
        label="Szülők elérhetősége (telefonszáma)"
        error={errors.szulo_elerhetoseg}
        type="tel"
      />

      <SubmitButton
        text="Tovább"
        isSubmitting={isSubmitting}
        className="!mb-5"
      />
    </BeiratkozasContainer>
  );
}

export default BeiratkozasSzemelyesAdatok;
