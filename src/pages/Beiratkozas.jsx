import { useContext } from "react";
import BeiratkozasDokumentumok from "../components/beiratkozas/BeiratkozasDokumentumok";
import BeiratkozasMain from "../components/beiratkozas/BeiratkozasMain";
import BeiratkozasSorrend from "../components/beiratkozas/sorrend/BeiratkozasSorrend";
import BeiratkozasSzemelyesAdatok from "../components/beiratkozas/BeiratkozasSzemelyesAdatok";
import { BeiratkozasContext } from "../context/beiratkozas/BeiratkozasContext";

function Beiratkozas() {
  const { stepperActive } = useContext(BeiratkozasContext);

  return (
    <div className=" min-h-[100vh] screen w-screen">
      <BeiratkozasMain currentActive={stepperActive} />
      <div className="lg:container bg-gray-50 min-h-[100vh] border-x-2 border-gray-300/50 shadow-md pb-10">
        <div>
          <BeiratkozasSzemelyesAdatok />
        </div>
        <div>
          <BeiratkozasDokumentumok isDisabled={false} /> {/*stepperActive < 1*/}
        </div>
        <div>
          <BeiratkozasSorrend isDisabled={false} /> {/*stepperActive < 2*/}
        </div>
      </div>
    </div>
  );
}

export default Beiratkozas;
