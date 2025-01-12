import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import "./dropzone.css";
import { useState } from "react";
import PreviewDialog from "./PreviewDialog";

function DropzonePreview({ preview, name, size, removeFile }) {
  const [open, setOpen] = useState(false);

  return (
    <ListGroup.Item
      as="li"
      className="d-flex justify-content-between align-items-start w-100"
    >
      <div className="blurContainer" role="button">
        <div className="blur" onClick={() => setOpen(true)}></div>
        <img src={preview} alt={name} width={90} height={50} />
        <PreviewDialog
          setOpen={setOpen}
          open={open}
          name={name}
          preview={preview}
        />
      </div>
      <div className="ms-2 me-auto">
        <div className="fw-bold fileName">{name}</div>
        {size / 1000} kB
      </div>
      <Badge bg="danger" pill onClick={removeFile} role="button">
        X
      </Badge>
    </ListGroup.Item>
  );
}

export default DropzonePreview;