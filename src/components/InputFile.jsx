import React from "react";
import PlusIcon from "./icons/PlusIcon";

function InputFile({ formRegister, label, title, error, wrapperClassName }) {
  return (
    <div className={`w-full container ${wrapperClassName}`}>
      <div className="bg-white border-[1.3px] p-4 rounded-[6.5px] shadow-md w-full text-xl text-inputGray">
        <p>{title}</p>
        <button className="bg-szPrimary-200 p-[2px] text-white text-center rounded-full align-middle hover:bg-szPrimary-300/70">
          <PlusIcon />
        </button>
      </div>
      {error && <span className="text-szSecondary-200">{error.message}</span>}
    </div>
  );
}

export default InputFile;
