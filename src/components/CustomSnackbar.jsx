import { Alert, Button, Snackbar } from "@mui/material";

function CustomSnackbar({ msg, open, handleClose, severity }) {
  const severityValue =
    typeof severity === "boolean" ? (severity ? "success" : "error") : severity;

  return (
    <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severityValue}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
