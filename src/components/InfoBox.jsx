import { useState } from "react";

function InfoBox({ children, className, buttonClassName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative ${
        isOpen ? "mb-4" : "mb-0"
      } ${className || ""} transition-all duration-300`}
    >
      <div className={buttonClassName}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-8 h-8 flex items-center justify-center bg-szPrimary-200 text-white text-lg font-bold rounded-full shadow-md transition-transform hover:scale-110 focus:outline-none ${
            isOpen ? "scale-110" : "scale-100"
          }`}
          style={{
            transition: "all 0.3s ease",
          }}
        >
          ?
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height, padding, visibility] duration-300 ease-in-out bg-gray-200/70 shadow-md rounded-lg mt-2 text-inputGray text-sm font-medium ${
          isOpen ? "max-h-screen p-4 visible" : "max-h-0 p-0 invisible"
        }`}
        style={{
          transition: "all 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default InfoBox;
