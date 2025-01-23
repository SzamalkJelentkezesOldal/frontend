import BeiratkozasStepper from "./BeiratkozasStepper";

function BeiratkozasMain({ currentActive }) {
  return (
    <section className="container flex flex-col aling-center p-1 pt-[5.5rem] bg-gray-50">
      <div className="w-full border-b-2 border-gray-300 py-5 drops-shadow-2xl fixed left-0 right-0 bg-white z-20 sm:px-16 md:px-26 lg:px-40">
        <BeiratkozasStepper currentActive={currentActive} />
      </div>
    </section>
  );
}

export default BeiratkozasMain;
