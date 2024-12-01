import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Grid2 } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PreviewDialog({ open, setOpen, name, preview }) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(false)}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {name}
          </Typography>
          <Button autoFocus color="inherit" onClick={() => setOpen(false)}>
            Bezárás
          </Button>
        </Toolbar>
      </AppBar>
      <Grid2
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        overflow={"hidden"}
      >
        <img
          src={preview}
          style={{
            objectFit: "contain",
            width: "100%",
            maxWidth: "100%",
            height: "100%",
          }}
        />
      </Grid2>
    </Dialog>
  );
}

export default PreviewDialog;
