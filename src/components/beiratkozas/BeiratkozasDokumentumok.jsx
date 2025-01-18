import InputText from "../InputText";
import BeiratkozasContainer from "./BeiratkozasContainer";

function BeiratkozasDokumentumok({ isDisabled }) {
  return (
    <BeiratkozasContainer
      title={"Dokumentumok"}
      isOpen={false}
      isDisabled={isDisabled}
    ></BeiratkozasContainer>
  );
}

export default BeiratkozasDokumentumok;
