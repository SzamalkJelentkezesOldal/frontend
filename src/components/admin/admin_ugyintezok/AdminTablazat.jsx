import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "../../icons/EditIcon";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AdminModosit from "./AdminModosit";
import { AdminUgyintezoContext } from "../../../context/admin/AdminUgyintezoContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AdminTorol from "./AdminTorol";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#00848b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AdminTablazat() {
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    getValues,
    editLoading,
    handleUgyintezoAdatok,
    handleClickOpenEdit,
    handleCloseEdit,
    handleClickOpenDelete, 
    handleCloseDelete, 
    theme,
    fullScreen,
    openEdit, 
    openDelete,
    setOpenEdit,
    setOpenDelete,
    ugyintezoLista,
    setKivalasztottUgyintezo,
    torlesUgyintezo,
    szurtUgyintezoLista,
    setSzurtUgyintezoLista,
    kivalasztottUgyintezo,
  } = useContext(AdminUgyintezoContext);

  const [keresesNev, setKeresesNev] = useState("");
  const [keresesMaster, setKeresesMaster] = useState("");

  const handleKereses = () => {
    const szurtLista = ugyintezoLista.filter((sor) => {
      const nevEgyezik = sor.name
        .toUpperCase()
        .includes(keresesNev.toUpperCase());
      const masterEgyezik =
        keresesMaster === "" ||
        (keresesMaster === "Igen" && sor.role > 1) ||
        (keresesMaster === "Nem" && sor.role <= 1);
      return nevEgyezik && masterEgyezik;
    });
    setSzurtUgyintezoLista(szurtLista);
  };

  const handleOsszesUgyintezo = () => {
    setSzurtUgyintezoLista(ugyintezoLista);
    setKeresesNev("");
    setKeresesMaster("");
  };

  return (
    <section className="container pt-10 pb-10">
      <div style={{ marginBottom: "20px" }}>
        <TextField
          label="Keresés név alapján"
          variant="outlined"
          value={keresesNev}
          onChange={(e) => setKeresesNev(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <FormControl
          variant="outlined"
          style={{ marginRight: "10px", minWidth: 120 }}
        >
          <InputLabel>Master</InputLabel>
          <Select
            value={keresesMaster}
            onChange={(e) => setKeresesMaster(e.target.value)}
            label="Master"
          >
            <MenuItem value="">
              <em>Vissza</em>
            </MenuItem>
            <MenuItem value="Igen">Igen</MenuItem>
            <MenuItem value="Nem">Nem</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleKereses}
          style={{ height: "56px", marginRight: "10px" }}
        >
          Keresés
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOsszesUgyintezo}
          style={{ height: "56px" }}
        >
          Összes ügyintéző
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Név</StyledTableCell>
              <StyledTableCell>E-mail</StyledTableCell>
              <StyledTableCell>Master</StyledTableCell>
              <StyledTableCell>Módosítás</StyledTableCell>
              <StyledTableCell>Törlés</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {szurtUgyintezoLista.map((sor) => (
              <StyledTableRow key={sor.id}>
                <StyledTableCell component="th" scope="row">
                  {sor.name}
                </StyledTableCell>
                <StyledTableCell>{sor.email}</StyledTableCell>
                <StyledTableCell>
                  {sor.role > 1 ? "Igen" : "Nem"}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleClickOpenEdit();
                    setKivalasztottUgyintezo(sor.id);
                  }}
                >
                  <EditIcon size={"24"} />
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleClickOpenDelete(); 
                    setKivalasztottUgyintezo(sor.id);
                  }}
                >
                  <PersonRemoveIcon size={"24"} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        fullScreen={fullScreen}
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="responsive-dialog-title"
        disableEnforceFocus
      >
        <form onSubmit={handleSubmit(handleUgyintezoAdatok)}>
          <DialogTitle id="responsive-dialog-title">
            {"Ügyintéző módosítása"}
          </DialogTitle>
          <DialogContent>
            <AdminModosit />
          </DialogContent>
          <DialogActions>
            <Button type={"button"} autoFocus onClick={handleCloseEdit}>
              Mégse
            </Button>
            <Button type={"submit"} onClick={handleCloseEdit} autoFocus>
              Módosítás
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="responsive-dialog-title"
        disableEnforceFocus
      >
        <DialogTitle id="responsive-dialog-title">
          {"Ügyintéző törlés megerősítése"}
        </DialogTitle>
        <DialogContent>
          <AdminTorol />
        </DialogContent>
        <DialogActions>
          <Button type={"button"} autoFocus onClick={handleCloseDelete}>
            Mégse
          </Button>
          <Button
            type={"button"}
            onClick={() => {
              torlesUgyintezo(kivalasztottUgyintezo); 
              handleCloseDelete(); 
            }}
            autoFocus
          >
            Megerősítés
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default AdminTablazat;