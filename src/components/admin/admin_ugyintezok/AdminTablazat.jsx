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

function AdminTablazat() {
  const {
    register,
    handleSubmit,
    isSubmitting,
    errors,
    getValues,
    adatokEdit,
    editLoading,
    handleUgyintezoAdatok,
    handleClickOpen,
    handleClose,
    theme,
    fullScreen,
    open,
    setOpen,
    ugyintezoLista,
    setKivalasztottUgyintezo,
  } = useContext(AdminUgyintezoContext);

  return (
    <section className="container pt-20 pb-10">
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
            {ugyintezoLista.map((sor) => (
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
                    console.log(sor.id);
                    handleClickOpen();
                    setKivalasztottUgyintezo(sor.id);
                  }}
                >
                  <EditIcon size={"24"} />
                </StyledTableCell>
                <StyledTableCell /*onClick={}*/>
                  <PersonRemoveIcon size={"24"} />
                </StyledTableCell>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  onClose={handleClose}
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
                      <Button type={"button"} autoFocus onClick={handleClose}>
                        Mégse
                      </Button>
                      <Button type={"submit"} onClick={handleClose} autoFocus>
                        Módosítás
                      </Button>
                    </DialogActions>
                  </form>
                </Dialog>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  );
}

export default AdminTablazat;
