import PlusIcon from "./icons/PlusIcon";
import { useRef, useState } from "react";

function InputFile({ formRegister, title, error, wrapperClassName, multiple }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    console.log(selectedFiles);
  };

  return (
    <div className={`w-full container ${wrapperClassName}`}>
      <div className="bg-white border-[1.3px] p-4 rounded-[6.5px] shadow-md w-full text-xl text-inputGray">
        <p>{title}</p>
        <button
          type="button"
          className="bg-szPrimary-200 p-[2px] text-white text-center rounded-full align-middle hover:bg-szPrimary-300/70"
          onClick={handleButtonClick}
        >
          <PlusIcon />
        </button>
        <input
          type="file"
          {...formRegister}
          ref={(e) => {
            fileInputRef.current = e;
            if (typeof formRegister === "function") formRegister(e);
          }}
          onChange={handleFileChange}
          accept=".pdf, .jpg, .jpeg, .png"
          className="hidden"
          multiple={multiple}
        />
      </div>
      {selectedFiles.length > 0 && (
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li key={index} className="text-sm text-gray-600">
              {file.name}
            </li>
          ))}
        </ul>
      )}
      {error && <span className="text-szSecondary-200">{error.message}</span>}
    </div>
  );
}

export default InputFile;
