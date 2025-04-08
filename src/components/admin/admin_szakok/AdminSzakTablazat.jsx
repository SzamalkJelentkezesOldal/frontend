import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminSzakContext } from "../../../context/admin/AdminSzakContext";
import AdminSzakModosit from "./AdminSzakModosit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

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

function AdminSzakTablazat() {
  const {
    reset,
    register,
    fullScreen,
    handleSubmit,
    handleSzakAdatok,
    handleClickOpenEdit,
    handleCloseEdit,
    handleClickOpenDelete,
    handleCloseDelete,
    openEdit,
    openDelete,
    kivalasztottSzak,
    torlesSzak,
    szakLista,
    szurtSzakLista,
    setSzurtSzakLista,
    setKivalasztottSzak,
    errors,
    isDirty,
    editLoading,
  } = useContext(AdminSzakContext);

  const [keresesNev, setKeresesNev] = useState("");
  const [keresesPortfolio, setKeresesPortfolio] = useState("");
  const [keresesTagozat, setKeresesTagozat] = useState("");

  const handleKereses = () => {
    const szurtLista = szakLista.filter((sor) => {
      const nevEgyezik = sor.elnevezes
        .toUpperCase()
        .includes(keresesNev.toUpperCase());
      const portfolioEgyezik =
        keresesPortfolio === "" ||
        (keresesPortfolio === "1" && sor.portfolio === 1) ||
        (keresesPortfolio === "0" && sor.portfolio === 0);
      const tagozatEgyezik =
        keresesTagozat === "" ||
        (keresesTagozat === "1" && sor.nappali === 1) ||
        (keresesTagozat === "0" && sor.nappali === 0);
      return nevEgyezik && portfolioEgyezik && tagozatEgyezik;
    });
    setSzurtSzakLista(szurtLista);
  };

  const handleOsszesSzak = () => {
    setSzurtSzakLista(szakLista);
    setKeresesNev("");
    setKeresesPortfolio("");
    setKeresesTagozat("");
  };

  return (
    <section className="container pt-10 pb-10">
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="Keresés név alapján"
          variant="outlined"
          value={keresesNev}
          onChange={(e) => setKeresesNev(e.target.value)}
          style={{ flex: 1 }}
        />
        <FormControl variant="outlined" style={{ flex: 1 }}>
          <InputLabel>Portfólió</InputLabel>
          <Select
            value={keresesPortfolio}
            onChange={(e) => setKeresesPortfolio(e.target.value)}
            label="Portfólió"
          >
            <MenuItem value="">Összes</MenuItem>
            <MenuItem value="1">Igen</MenuItem>
            <MenuItem value="0">Nem</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ flex: 1 }}>
          <InputLabel>Tagozat</InputLabel>
          <Select
            value={keresesTagozat}
            onChange={(e) => setKeresesTagozat(e.target.value)}
            label="Tagozat"
          >
            <MenuItem value="">Összes</MenuItem>
            <MenuItem value="1">Nappali</MenuItem>
            <MenuItem value="0">Esti</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={handleKereses}
          style={{ height: "56px" }}
        >
          Keresés
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOsszesSzak}
          style={{ height: "56px" }}
        >
          Összes szak
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Elnevezés</StyledTableCell>
              <StyledTableCell>Portfólió</StyledTableCell>
              <StyledTableCell>Tagozat</StyledTableCell>
              <StyledTableCell>Módosítás</StyledTableCell>
              <StyledTableCell>Törlés</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {szurtSzakLista.map((sor) => (
              <StyledTableRow key={sor.id}>
                <StyledTableCell component="th" scope="row">
                  {sor.elnevezes}
                </StyledTableCell>
                <StyledTableCell>
                  {sor.portfolio ? "Igen" : "Nem"}
                </StyledTableCell>
                <StyledTableCell>
                  {sor.nappali ? "Nappali" : "Esti"}
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    setKivalasztottSzak(sor.id);
                    const kivalasztott = szakLista.find(
                      (szak) => szak.id === sor.id
                    );
                    if (kivalasztott) {
                      reset({
                        elnevezes: kivalasztott.elnevezes,
                        portfolio: kivalasztott.portfolio ?? false,
                        nappali: kivalasztott.nappali ?? false,
                      });
                    }
                    handleClickOpenEdit();
                  }}
                >
                  <EditIcon fontSize="small" />
                </StyledTableCell>
                <StyledTableCell
                  onClick={() => {
                    handleClickOpenDelete();
                    setKivalasztottSzak(sor.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
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
        <form onSubmit={handleSubmit(handleSzakAdatok)}>
          <DialogTitle id="responsive-dialog-title">
            {"Szak módosítása"}
          </DialogTitle>
          <DialogContent>
            <AdminSzakModosit />
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

      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Szak törlése</DialogTitle>
        <DialogContent>Biztosan törölni szeretnéd ezt a szakot?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="secondary">
            Mégse
          </Button>
          <Button
            onClick={() => {
              torlesSzak(kivalasztottSzak);
              handleCloseDelete();
            }}
            color="primary"
          >
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default AdminSzakTablazat;
