import { useContext } from "react";
import BeiratkozasContainer from "../BeiratkozasContainer";
import DraggableList from "./DraggableList";
import { SorrendContext } from "../../../context/beiratkozas/SorrendContext";
import SubmitButton from "../../SubmitButton";
import InfoBox from "../../InfoBox";

function BeiratkozasSorrend({ isDisabled }) {
  const { updateSorrend, handleSubmit, isSubmitting } =
    useContext(SorrendContext);

  return (
    <BeiratkozasContainer
      title={"Sorrend"}
      isOpen={false}
      isDisabled={isDisabled}
      onSubmit={handleSubmit(updateSorrend)}
    >
      <div className="container md:max-w-[700px] pt-5">
        <InfoBox>
          Módosítsd a szakok sorrendjét saját prefeneciád szerint.
        </InfoBox>
        <DraggableList />
      </div>
      <SubmitButton
        text="Tovább"
        isSubmitting={isSubmitting}
        className="!mb-5 !mt-10 md:max-w-xs lg:mt-8"
      />
      {/* <div className="w-full flex justify-center items-center pt-10">
        <button className="bg-gradient-to-br from-szSecondary-100/80 via-szSecondary-100  to-szSecondary-200 p-2 rounded-lg px-5 shadow-lg hover:bg-red-800 hover:shadow-xl duration-200 transition-all font-medium tracking-widest w-1/4">
          Beiratkozás
        </button>
      </div> */}
    </BeiratkozasContainer>
  );
}

export default BeiratkozasSorrend;
