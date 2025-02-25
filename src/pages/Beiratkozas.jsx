import { useContext } from "react";
import BeiratkozasDokumentumok from "../components/beiratkozas/BeiratkozasDokumentumok";
import BeiratkozasMain from "../components/beiratkozas/BeiratkozasMain";
import BeiratkozasSorrend from "../components/beiratkozas/sorrend/BeiratkozasSorrend";
import BeiratkozasSzemelyesAdatok from "../components/beiratkozas/BeiratkozasSzemelyesAdatok";
import { BeiratkozasContext } from "../context/beiratkozas/BeiratkozasContext";

function Beiratkozas() {
  const { stepperActive, allapotLoading } = useContext(BeiratkozasContext);

  if (allapotLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className=" min-h-[100vh] screen w-screen">
      <BeiratkozasMain currentActive={stepperActive} />
      <div className="lg:container bg-gray-50 min-h-[100vh] border-x-2 border-gray-300/50 shadow-md pb-10 !max-w-[1000px]">
        <div>
          <BeiratkozasSzemelyesAdatok isCompleted={stepperActive > 0} />
        </div>
        <div>
          <BeiratkozasDokumentumok
            isDisabled={stepperActive < 1}
            isCompleted={stepperActive > 1}
          />
        </div>
        <div>
          <BeiratkozasSorrend
            isDisabled={stepperActive < 2}
            isCompleted={stepperActive > 2}
          />
        </div>
      </div>
    </div>
  );
}

export default Beiratkozas;
