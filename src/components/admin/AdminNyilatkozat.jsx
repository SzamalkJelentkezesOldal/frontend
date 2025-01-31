import React, { useContext } from "react";
import CustomForm from "../CustomForm";
import { AdminNyilatkozatContext } from "../../context/admin/AdminNyilatkozatContext";
import SubmitButton from "../SubmitButton";
import InfoBox from "../InfoBox";
import InputFile from "../InputFile";
import InputNumber from "../InputNumber";

const AdminNyilatkozat = () => {
  const {
    jelenlegiEv,
    handleSubmit,
    nyilatkozatFeltolt,
    isSubmitting,
    formRegister,
    errors,
    watch,
    setValue,
    resetTrigger,
  } = useContext(AdminNyilatkozatContext);
  return (
    <section className="w-full pt-20">
      <CustomForm
        onSubmit={handleSubmit(nyilatkozatFeltolt)}
        title="Nyilatkozat feltöltése"
        className={"!max-w-[550px] flex flex-col gap-2"}
      >
        <div className="w-full flex justify-center mt-3">
          <InputNumber
            formRegister={formRegister}
            name="ev"
            label="Év"
            error={errors.ev}
            min={jelenlegiEv}
            max={jelenlegiEv + 1}
            currentValue={watch("ev")}
            setValue={setValue}
          />
        </div>

        <div className={`w-full max-w-sm container`}>
          <InfoBox buttonClassName={`pl-[14px]`}>
            Elfogadott kiterjesztés: .docx
          </InfoBox>
          <InputFile
            setValue={setValue}
            name="nyilatkozat"
            accept={".docx"}
            title="Nyilatkozat"
            formRegister={formRegister("nyilatkozat")}
            error={errors.nyilatkozat}
            resetTrigger={resetTrigger}
          />
        </div>

        <SubmitButton isSubmitting={isSubmitting} text="Feltöltés" />
      </CustomForm>
    </section>
  );
};

export default AdminNyilatkozat;
