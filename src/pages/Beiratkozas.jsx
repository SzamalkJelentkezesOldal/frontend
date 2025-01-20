import { useContext } from "react";
import BeiratkozasDokumentumok from "../components/beiratkozas/BeiratkozasDokumentumok";
import BeiratkozasMain from "../components/beiratkozas/BeiratkozasMain";
import BeiratkozasSorrend from "../components/beiratkozas/BeiratkozasSorrend";
import BeiratkozasSzemelyesAdatok from "../components/beiratkozas/BeiratkozasSzemelyesAdatok";
import { BeiratkozasContext } from "../context/beiratkozas/BeiratkozasContext";

function Beiratkozas() {
  const { stepperActive } = useContext(BeiratkozasContext);

  return (
    <div className=" min-h-[100vh] screen w-screen min-w-[380px]">
      <BeiratkozasMain currentActive={stepperActive} />
      <div className="lg:container bg-gray-50 min-h-[100vh] border-x-2 border-gray-300/50 shadow-md pb-10">
        <div>
          <BeiratkozasSzemelyesAdatok />
        </div>
        <div>
          <BeiratkozasDokumentumok isDisabled={stepperActive < 1} />
        </div>
        <div>
          <BeiratkozasSorrend isDisabled={stepperActive < 2} />
        </div>
        <div className="w-full flex justify-center items-center pt-10">
          <button className="bg-gradient-to-br from-szSecondary-100/80 via-szSecondary-100  to-szSecondary-200 p-2 rounded-lg px-5 shadow-lg hover:bg-red-800 hover:shadow-xl duration-200 transition-all font-medium tracking-widest w-1/4">
            Beiratkozás
          </button>
        </div>
      </div>
    </div>
  );
}

export default Beiratkozas;
