import React, { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  tableCellClasses,
} from "@mui/material";
import { AdminSzakFelveszContext } from "../../../context/admin/AdminSzakFelveszContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    szakLista,
    setSzakLista,
    handleClickOpenEdit,
    handleClickOpenDelete,
    handleCloseEdit,
    handleCloseDelete,
    torlesSzak,
    openEdit,
    openDelete,
    setKivalasztottSzak,
  } = useContext(AdminSzakFelveszContext);

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
        (keresesPortfolio === "Igen" && sor.portfolio === 1) ||
        (keresesPortfolio === "Nem" && sor.portfolio === 0);
      const tagozatEgyezik =
        keresesTagozat === "" || sor.tagozat === keresesTagozat;
      return nevEgyezik && portfolioEgyezik && tagozatEgyezik;
    });
    setSzakLista(szurtLista);
  };

  const handleOsszesSzak = () => {
    setKeresesNev("");
    setKeresesPortfolio("");
    setKeresesTagozat("");
    setSzakLista(szakLista);
  };

  return (
    <section className="container pt-10 pb-10">
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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
            <MenuItem value="">
              <em>Vissza</em>
            </MenuItem>
            <MenuItem value="Igen">Igen</MenuItem>
            <MenuItem value="Nem">Nem</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ flex: 1 }}>
          <InputLabel>Tagozat</InputLabel>
          <Select
            value={keresesTagozat}
            onChange={(e) => setKeresesTagozat(e.target.value)}
            label="Tagozat"
          >
            <MenuItem value="">
              <em>Vissza</em>
            </MenuItem>
            <MenuItem value="Nappali">Nappali</MenuItem>
            <MenuItem value="Esti">Esti</MenuItem>
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
            {console.log("SzakLista adatok:", szakLista)}
            {szakLista &&
              szakLista.map((sor) => (
                <StyledTableRow key={sor.id}>
                  <StyledTableCell component="th" scope="row">
                    {sor.elnevezes}
                  </StyledTableCell>
                  <StyledTableCell>
                    {sor.portfolio === 1 ? "Igen" : "Nem"}
                  </StyledTableCell>
                  <StyledTableCell>
                    {sor.nappali === 1 ? "Nappali" : "Esti"}{" "}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      handleClickOpenEdit();
                      setKivalasztottSzak(sor.id);
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
    </section>
  );
}

export default AdminSzakTablazat;
