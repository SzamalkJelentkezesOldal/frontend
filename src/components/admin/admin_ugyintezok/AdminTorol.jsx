import { useContext } from "react";
import { AdminUgyintezoContext } from "../../../context/admin/AdminUgyintezoContext";
import { Typography, Box } from "@mui/material";

function AdminTorol() {
  const { kivalasztottUgyintezo, ugyintezoLista } = useContext(AdminUgyintezoContext);

  const kivalasztottUgyintezoAdatok = ugyintezoLista.find(
    (ugyintezo) => ugyintezo.id === kivalasztottUgyintezo
  );

  if (!kivalasztottUgyintezoAdatok) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Név:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {kivalasztottUgyintezoAdatok.name}
      </Typography>

      <Typography variant="h6" gutterBottom>
        E-mail:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {kivalasztottUgyintezoAdatok.email}
      </Typography>

      <Typography variant="h6" gutterBottom>
        Master:
      </Typography>
      <Typography variant="body1" gutterBottom>
        {kivalasztottUgyintezoAdatok.role > 1 ? "Igen" : "Nem"}
      </Typography>
    </Box>
  );
}

export default AdminTorol;