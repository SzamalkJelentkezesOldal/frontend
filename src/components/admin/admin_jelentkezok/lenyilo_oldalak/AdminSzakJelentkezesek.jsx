import { Button, Select, Table } from "@mantine/core";
import { useContext, useState } from "react";
import AdminSzakJelentkezesekSorok from "./AdminSzakJelentkezesekSorok";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import InfoBox from "../../../InfoBox";

function AdminSzakJelentkezesek({ adat }) {
  const [selected, setSelected] = useState(null);
  const { jelentkezesekVeglegesitese } = useContext(AdminJelentkezokContext);

  const szakStatuszStilus = (allapot, allapotszotar) => {
    if (allapot === 1) {
      return "border-[1px] border-yellow-700 text-yellow-700";
    } else if (allapot < 5) {
      return "border-[1px] border-light-blue-300 text-light-blue-300";
    } else {
      switch (allapotszotar.elnevezes) {
        case "Elfogadva":
          return "border-[1px] border-green-600 text-green-600";
        case "Elutasítva":
          return "border-[1px] border-red-700 text-red-700";
        case "Eldöntésre vár":
          return "border-[1px] border-blue-800 text-blue-800";
        case "Módosításra vár":
          return "border-[1px] border-orange-800 text-orange-800";
        default:
          return "border-[1px] border-light-blue-300 text-light-blue-300";
      }
    }
  };

  const vanEldontesreVaro = () => {
    if (!adat || adat.length === 0) return false;
    return adat.some((jelentkezes) => jelentkezes.allapot === 5);
  };

  const rows = adat.map((jelentkezes) => (
    <AdminSzakJelentkezesekSorok
      key={jelentkezes.id}
      jelentkezes={jelentkezes}
      szakStatuszStilus={szakStatuszStilus}
    />
  ));

  return (
    <div className="flex flex-col gap-5">
      <div>
        <InfoBox>
          A "Jelentkezések véglegesítése" gomb megnyomásával a jelentkezés nem
          lesz többet módosítható és a jelentkezés eredményéről egy értesítő
          email kerül kiküldésre.
        </InfoBox>
        <Button
          onClick={() => jelentkezesekVeglegesitese(adat.jelentkezo_id)}
          disabled={vanEldontesreVaro()}
        >
          Jelentkezések véglegesítése
        </Button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Sorrend</th>
            <th>Tagozat</th>
            <th>Szak</th>
            <th>Státusz</th>
            <th>Jelentkezés módosítása</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
}

export default AdminSzakJelentkezesek;
