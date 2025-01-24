import PlusIcon from "./icons/PlusIcon";
import { useRef, useState } from "react";
import SmallCloseIcon from "./icons/SmallCloseIcon";

function InputFile({ formRegister, title, error, wrapperClassName, multiple }) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [extensionError, setExtensionError] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    setExtensionError(false);
    const newFiles = Array.from(event.target.files);

    if (!multiple) {
      setSelectedFiles(newFiles.slice(0, 1));
    } else {
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }

    event.target.value = null;
  };

  const handleRemoveFile = (index) => {
    setExtensionError(false);
    const fileToRemove = selectedFiles[index];
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));

    // Ha az eltávolított fájl az előnézetben lévő fájl, akkor az előnézetet töröljük
    if (previewFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result === previewFile) {
          setPreviewFile(null);
        }
      };
      reader.readAsDataURL(fileToRemove);
    }
  };

  const handlePreview = (file) => {
    setExtensionError(false);
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedExtensions.includes(file.type)) {
      setExtensionError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewFile(reader.result); // A fájl tartalmát állítja be előnézethez
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`w-full container ${wrapperClassName} mb-7`}>
      <div className="bg-white border-[1.3px] flex flex-col gap-2 p-4 rounded-[6.5px] shadow-md w-full text-xl text-inputGray">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="bg-szPrimary-200 p-[2px] text-white text-center rounded-full align-middle hover:bg-szPrimary-300/70"
            onClick={handleButtonClick}
          >
            <PlusIcon />
          </button>
          <p>{title}</p>
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
        {extensionError ? (
          <p className="text-szSecondary-100 text-sm">
            Csak képeknek van előnézete.
          </p>
        ) : (
          ""
        )}
        {error && (
          <span className="text-szSecondary-200 text-sm">{error.message}</span>
        )}
      </div>
      {/* Fájlok listája törlés és előnézet lehetőséggel */}
      {selectedFiles.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-[2px]">
          {selectedFiles.map((file, index) => (
            <li
              key={index}
              className="text-sm text-gray-600 bg-inputGray-50 p-1 px-2 rounded-xl flex items-center justify-between gap-2 w-max"
            >
              <span
                className="cursor-pointer hover:underline"
                onClick={() => handlePreview(file)}
              >
                {file.name}
              </span>
              <button
                type="button"
                className="rounded-full hover:bg-szSecondary-100/50"
                onClick={() => handleRemoveFile(index)}
              >
                <SmallCloseIcon size="18" color="#8b8b8b" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {/* Előnézeti ablak */}
      {previewFile && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">Előnézet:</p>
            <button
              type="button"
              className="mt-2 bg-szSecondary-200 rounded-full"
              onClick={() => setPreviewFile(null)}
            >
              <SmallCloseIcon size="18" color="white" />
            </button>
          </div>
          <div className="border p-2 rounded shadow-md">
            <img
              src={previewFile}
              alt="File Preview"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InputFile;
