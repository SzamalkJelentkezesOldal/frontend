import { useState } from "react";
import BeiratkozasDokumentumok from "../components/beiratkozas/BeiratkozasDokumentumok";
import BeiratkozasMain from "../components/beiratkozas/BeiratkozasMain";
import BeiratkozasSorrend from "../components/beiratkozas/BeiratkozasSorrend";
import BeiratkozasSzemelyesAdatok from "../components/beiratkozas/BeiratkozasSzemelyesAdatok";

function Beiratkozas() {
  const [currentActive, setCurrentActive] = useState(0);

  return (
    <div className="bg-gray-50 min-h-[100vh] screen w-screen min-w-[380px]">
      <BeiratkozasMain currentActive={currentActive} />
      <div className="">
        <div>
          <BeiratkozasSzemelyesAdatok />
        </div>
        <div>
          <BeiratkozasDokumentumok isDisabled={currentActive < 1} />
        </div>
        <div>
          <BeiratkozasSorrend isDisabled={currentActive < 2} />
        </div>
        <div className="w-full flex justify-center items-center pt-10">
          <button
            className="bg-gradient-to-br from-szSecondary-100/80 via-szSecondary-100  to-szSecondary-200 p-2 rounded-lg px-5 shadow-lg hover:bg-red-800 hover:shadow-xl duration-200 transition-all font-medium tracking-widest w-1/2"
            onClick={() => setCurrentActive((prev) => prev + 1)}
          >
            TESZT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Beiratkozas;
