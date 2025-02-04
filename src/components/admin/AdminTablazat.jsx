import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ApiContext } from "../../context/ApiContext";

import EditIcon from "../icons/EditIcon";
import AdminModosit from "./AdminModosit";

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
  const { ugyintezoLista } = useContext(ApiContext);
  const [kivalasztottSor, setKivalasztottSor] = useState(null);

  const kattintas = (sor) => {
    setKivalasztottSor(sor);
  }
  const bezaras = () => {
    setKivalasztottSor(null); 
  }


  return (
    <section className="container pt-20">
    {kivalasztottSor && (<AdminModosit sor={kivalasztottSor} bezaras={bezaras}/>)}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Név</StyledTableCell>
              <StyledTableCell>E-mail</StyledTableCell>
              <StyledTableCell>Master</StyledTableCell>
              <StyledTableCell>Módosítás</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ugyintezoLista.map((sor) => (
              <StyledTableRow key={sor.id}>
                <StyledTableCell component="th" scope="row">
                  {sor.name}
                </StyledTableCell>
                <StyledTableCell>{sor.email}</StyledTableCell>
                <StyledTableCell>
                  {sor.role > 1 ? "Igen" : "Nem"}
                </StyledTableCell>
                <StyledTableCell onClick={() => kattintas(sor)}>
                  <EditIcon size={"24"} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </section>
  );
}

export default AdminTablazat;
