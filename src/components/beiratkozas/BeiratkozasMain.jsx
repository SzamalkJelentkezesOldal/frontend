import BeiratkozasStepper from "./BeiratkozasStepper";

function BeiratkozasMain({ currentActive }) {
  return (
    <section className="container min-w-[380px] flex flex-col aling-center p-1 pt-[5.5rem] bg-gray-50  sm:p-12 sm:max-w-[1000px] sm:mt-20 sm:h-auto sm:rounded-3xl sm:shadow-lg  sm:bg-gray-50 sm:mb-20">
      <div className="w-full border-b-2 border-gray-300 py-5 drops-shadow-2xl fixed left-0 right-0 bg-white z-10">
        <BeiratkozasStepper currentActive={currentActive} />
      </div>
    </section>
  );
}

export default BeiratkozasMain;
