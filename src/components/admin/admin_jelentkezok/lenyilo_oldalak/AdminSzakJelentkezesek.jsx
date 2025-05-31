import { Button, Select, Table } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useContext, useState, useEffect } from "react";
import AdminSzakJelentkezesekSorok from "./AdminSzakJelentkezesekSorok";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import InfoBox from "../../../InfoBox";
import SubmitSpinner from "../../../icons/SubmitSpinner";
import { IconCheck, IconX } from "@tabler/icons-react";

function AdminSzakJelentkezesek({ adat }) {
  const [selected, setSelected] = useState(null);
  const [localAdat, setLocalAdat] = useState(adat);
  const [eldontesreVar, setEldontesreVar] = useState(false);
  const [veglegesitesLoading, setVeglegesitesLoading] = useState(false);
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
    if (!localAdat || localAdat.length === 0) return false;
    return localAdat.some((jelentkezes) => jelentkezes.allapot === 5);
  };

  const updateJelentkezes = (updatedJelentkezes) => {
    setLocalAdat((prevAdat) =>
      prevAdat.map((item) =>
        item.id === updatedJelentkezes.id ? updatedJelentkezes : item
      )
    );
  };

  useEffect(() => {
    setEldontesreVar(vanEldontesreVaro());
  }, [localAdat]);

  const showNotification = (message, success) => {
    notifications.show({
      title: success ? "Sikeres művelet" : "Hiba történt",
      message: message,
      color: success ? "teal" : "red",
      icon: success ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />,
      autoClose: 3500,
    });
  };

  const handleVeglegesites = async () => {
    if (!localAdat[0]?.jelentkezo_id) return;

    setVeglegesitesLoading(true);
    try {
      const result = await jelentkezesekVeglegesitese(
        localAdat[0].jelentkezo_id
      );

      if (result.success) {
        // Frissítjük a lezart állapotot a helyi adatokban
        setLocalAdat((prev) =>
          prev.map((item) => ({
            ...item,
            lezart: true,
          }))
        );

        showNotification(
          "Jelentkezések sikeresen véglegesítve, email kiküldve!",
          true
        );
      } else {
        showNotification("Hiba történt a véglegesítés során!", false);
      }
    } catch (error) {
      showNotification("Hiba történt a véglegesítés során!", false);
    } finally {
      setVeglegesitesLoading(false);
    }
  };

  const rows = localAdat.map((jelentkezes) => (
    <AdminSzakJelentkezesekSorok
      key={jelentkezes.id}
      jelentkezes={jelentkezes}
      szakStatuszStilus={szakStatuszStilus}
      onUpdate={updateJelentkezes}
    />
  ));

  return (
    <div className="flex flex-col gap-5">
      <div>
        {!localAdat[0]?.lezart && (
          <InfoBox>
            A "Jelentkezések véglegesítése" gomb megnyomásával a jelentkezés nem
            lesz többet módosítható és a jelentkezés eredményéről egy értesítő
            email kerül kiküldésre.
          </InfoBox>
        )}
        <Button
          onClick={handleVeglegesites}
          disabled={
            eldontesreVar || localAdat[0]?.lezart || veglegesitesLoading
          }
        >
          {veglegesitesLoading ? <SubmitSpinner /> : ""}
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
