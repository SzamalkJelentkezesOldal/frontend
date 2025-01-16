import { Alert, Button, Snackbar } from "@mui/material";

function CustomSnackbar({ msg, open, handleClose, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity ? "success" : "error"}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
