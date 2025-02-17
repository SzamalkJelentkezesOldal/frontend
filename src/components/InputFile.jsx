import PlusIcon from "./icons/PlusIcon";
import { useEffect, useRef, useState } from "react";
import SmallCloseIcon from "./icons/SmallCloseIcon";
import DownloadIcon from "./icons/DownloadIcon";

function InputFile({
  formRegister,
  title,
  error,
  wrapperClassName,
  multiple,
  download,
  handleDownloadClick,
  accept,
  setValue,
  name,
  resetTrigger,
  existingFiles,
  trigger,
  admin,
}) {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [extensionError, setExtensionError] = useState(false);
  const [existingPreviews, setExistingPreviews] = useState([]);

  useEffect(() => {
    if (!admin) {
      if (resetTrigger) {
        setSelectedFiles([]);
        setPreviewFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
      const previews = existingFiles.map((file) => {
        const ext = file.split(".").pop();
        return {
          name: `${name}.${ext}`,
          path: file,
        };
      });
      setExistingPreviews(previews);
      setValue(`${name}_current`, JSON.stringify(existingFiles));
    }
  }, [resetTrigger, existingFiles, name, setValue]);

  const handleDeleteExisting = (index) => {
    const newExistingPreviews = existingPreviews.filter((_, i) => i !== index);
    setExistingPreviews(newExistingPreviews);
    // Frissítjük a _current értéket:
    const updatedCurrent = JSON.stringify(
      newExistingPreviews.map((file) => file.path)
    );
    setValue(`${name}_current`, updatedCurrent, { shouldDirty: true });
    // Indítsuk el a validációt az adott mezőre:
    trigger(name);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    setExtensionError(false);
    const newFiles = Array.from(event.target.files);

    if (multiple) {
      // Felhasználói változás esetén jelöljük dirty-ként
      setValue(name, event.target.files, { shouldDirty: true });
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    } else {
      // Ha nem multiple, cseréljük fel a korábbi (selectedFiles) értéket
      setValue(name, newFiles[0] || null, { shouldDirty: true });
      setSelectedFiles(newFiles.slice(0, 1));
      // Töröljük az előző, current értéket, mert új fájl érkezik
      setExistingPreviews([]);
      setValue(`${name}_current`, "[]", { shouldDirty: true });
    }

    event.target.value = "";
  };

  const handleRemoveFile = (index) => {
    setExtensionError(false);
    const removedFile = selectedFiles[index];
    const newFiles = selectedFiles.filter((_, i) => i !== index);

    if (multiple) {
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      setValue(name, dataTransfer.files, { shouldDirty: true });
    } else {
      setValue(name, newFiles.length === 0 ? undefined : newFiles[0], {
        shouldDirty: true,
      });
    }

    setSelectedFiles(newFiles);

    if (previewFile) {
      if (removedFile && previewFile.name === removedFile.name) {
        setPreviewFile(null);
      }
    }

    if (newFiles.length === 0) {
      fileInputRef.current.value = "";
    }
  };

  const handlePreview = (file) => {
    setExtensionError(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    if (file?.path) {
      const previewUrl = `${apiUrl}/api/dokumentumok/preview?path=${encodeURIComponent(
        file.path
      )}`;
      setPreviewFile({ data: previewUrl, name: file.name });
      return;
    }
    const allowedExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedExtensions.includes(file.type)) {
      setExtensionError(true);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewFile({
        data: reader.result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      className={`w-full container ${wrapperClassName} mb-7 sm:mb-10 md:mb-10 lg:mb-14`}
    >
      <div className="bg-white border-[1.3px] flex flex-col gap-2 p-4 rounded-[6.5px] shadow-md w-full text-xl text-inputGray">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="bg-szPrimary-200 p-[2px] text-white text-center rounded-full hover:bg-szPrimary-300/70"
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
              formRegister.ref(e);
            }}
            onChange={handleFileChange}
            accept={accept || ".pdf, .jpg, .jpeg, .png"}
            className="hidden"
            multiple={multiple}
          />
          {download && (
            <button
              onClick={handleDownloadClick}
              type="button"
              className="bg-gradient-to-r from-szSecondary-100/90 to-szSecondary-100 p-[3px] px-2 text-center rounded-2xl hover:bg-szSecondary-200/90 duration-200 transition-all text-white flex items-center"
            >
              <DownloadIcon />
              <span className="hidden sm:inline text-base">Letöltés</span>
            </button>
          )}
        </div>
        {extensionError && (
          <p className="text-szSecondary-100 text-sm">
            Csak képeknek van előnézete.
          </p>
        )}
      </div>
      {error && (
        <span className="text-szSecondary-200 text-sm">{error.message}</span>
      )}
      {existingPreviews.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-[2px]">
          {existingPreviews.map((file, index) => (
            <li
              key={`existing-${index}`}
              className="text-sm text-gray-600 bg-inputGray-50 p-1 px-2 rounded-xl flex items-center justify-between gap-2 w-max"
            >
              <span
                className="cursor-pointer hover:underline"
                onClick={() => handlePreview(file)}
              >
                {file.name}
              </span>
              <span className="text-gray-400 ml-2">(Feltöltve)</span>
              <button
                type="button"
                className="rounded-full hover:bg-white/30"
                onClick={() => handleDeleteExisting(index)}
              >
                <SmallCloseIcon size="18" color="#8b8b8b" />
              </button>
            </li>
          ))}
        </ul>
      )}
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
                className="rounded-full hover:bg-white/30"
                onClick={() => handleRemoveFile(index)}
              >
                <SmallCloseIcon size="18" color="#8b8b8b" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {previewFile && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="mt-2 bg-szSecondary-200/80 hover:bg-szSecondary-200 rounded-full"
              onClick={() => setPreviewFile(null)}
            >
              <SmallCloseIcon size="18" color="white" />
            </button>
          </div>
          <div className="border p-2 rounded shadow-md w-max max-w-full">
            <img
              src={previewFile.data}
              alt="Fájl előnézet"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default InputFile;
