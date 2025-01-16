import BeiratkozasStepper from "./BeiratkozasStepper";

function BeiratkozasMain() {
  return (
    <section className="container min-w-[380px] flex flex-col aling-center p-1 pt-28 h-screen bg-gray-50  sm:p-12 sm:max-w-[1000px] sm:mt-20 sm:h-auto sm:rounded-3xl sm:shadow-lg  sm:bg-gray-50 sm:mb-20">
      <div className="w-full">
        <BeiratkozasStepper />
      </div>
    </section>
  );
}

export default BeiratkozasMain;
