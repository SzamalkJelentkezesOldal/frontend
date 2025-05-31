import { useContext, useEffect } from "react";
import BeiratkozasContainer from "../BeiratkozasContainer";
import DraggableList from "./DraggableList";
import { SorrendContext } from "../../../context/beiratkozas/SorrendContext";
import SubmitButton from "../../SubmitButton";
import InfoBox from "../../InfoBox";
import SubmitSpinner from "../../icons/SubmitSpinner";
import { BeiratkozasContext } from "../../../context/beiratkozas/BeiratkozasContext";
import { AuthContext } from "../../../context/AuthContext";

function BeiratkozasSorrend({ isDisabled, isCompleted }) {
  const {
    handleSorrend,
    handleSubmit,
    isSubmitting,
    sorrendLekerdez,
    isOpen,
    setIsOpen,
    jelentkezesek,
    submitStatus,
    sorrendLoading,
  } = useContext(SorrendContext);

  const { user } = useContext(AuthContext);
  const { stepperActive } = useContext(BeiratkozasContext);

  useEffect(() => {
    if (user && user.email) {
      sorrendLekerdez(true);

      const loadTimer = setTimeout(() => {
        if (user && user.email) {
          sorrendLekerdez(true);
        }
      }, 1000);

      return () => clearTimeout(loadTimer);
    }
  }, [sorrendLekerdez, user]);

  const isButtonDisabled =
    isSubmitting ||
    submitStatus.loading ||
    sorrendLoading ||
    !jelentkezesek ||
    jelentkezesek.length === 0;

  return (
    <BeiratkozasContainer
      title={"Sorrend"}
      isOpen={isOpen}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(handleSorrend)}
      isCompleted={isCompleted}
      handleEdit={() => sorrendLekerdez(true)}
      setIsOpen={setIsOpen}
    >
      <div className="container md:max-w-[700px] pt-5">
        <InfoBox>
          Módosítsd a szakok sorrendjét saját prefeneciád szerint.
        </InfoBox>
        <DraggableList />

        {submitStatus.error && (
          <div className="text-red-600 mt-4 text-center">
            Hiba történt: {submitStatus.error}
          </div>
        )}
      </div>
      {isCompleted ? (
        <SubmitButton
          text="Módosítás"
          isSubmitting={isButtonDisabled}
          className="!mb-5 !mt-10 md:max-w-xs lg:mt-8"
        />
      ) : (
        <button
          className="min-w-36 p-3 text-gray-50/90 self-center mt-10 w-1/4 bg-gradient-to-br from-szSecondary-100/80 via-szSecondary-100  to-szSecondary-200 rounded-lg px-5 shadow-lg hover:text-white hover:bg-red-800 hover:shadow-xl duration-200 transition-all font-semibold tracking-widest flex items-center justify-center"
          type="submit"
          disabled={isButtonDisabled}
        >
          {submitStatus.loading ? (
            <>
              <SubmitSpinner /> Folyamatban...
            </>
          ) : (
            "Beiratkozás"
          )}
        </button>
      )}
    </BeiratkozasContainer>
  );
}

export default BeiratkozasSorrend;
