import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ListGroup from "react-bootstrap/ListGroup";
import DropzonePreview from "./DropzonePreview";

function Dropzone({ setFiles, files }) {
  const [displayError, setDisplayError] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length) {
      setDisplayError(false);
      setFiles((previousFiles) => [
        ...previousFiles,
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles.length) {
      setDisplayError(true);
      rejectedFiles = [];
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 4000000,
  });

  function removeFile(name) {
    setFiles((files) => files.filter((file) => file[0].name !== name));
  }

  return (
    <>
      <div {...getRootProps()} className="customDropzone">
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="d-flex flex-column align-items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-file-arrow-down"
              viewBox="0 0 16 16"
            >
              <path d="M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5" />
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
            </svg>
            <p>Engedd el a fájlokat ...</p>
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-folder"
              viewBox="0 0 16 16"
            >
              <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z" />
            </svg>
            <p>Húzd ide a fájlokat, vagy kattints a kiválasztáshoz!</p>
          </div>
        )}
      </div>
      <ListGroup className="mt-2 mb-2">
        {files.map((file, index) => {
          return (
            <DropzonePreview
              key={index}
              preview={file[0].preview}
              name={file[0].name}
              size={file[0].size}
              removeFile={() => removeFile(file[0].name)}
            />
          );
        })}
      </ListGroup>
      <div className="d-flex  align-items-center">
        {displayError ? (
          <p className="text-danger">Maximum méret: 15MB</p>
        ) : undefined}
      </div>
    </>
  );
}

export default Dropzone;
