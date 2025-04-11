import { Button, Select, Table } from "@mantine/core";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import { useContext, useState } from "react";
import EditIcon from "../../../icons/EditIcon";

function AdminJelentkezokPortfolio({ adat, jelentkezoId }) {
  const { updatePortfolioStatus, sendPortfolioOsszegzo } = useContext(
    AdminJelentkezokContext
  );

  // Kezdetben minden sor szerkesztési módban van: így a select enabled, a gomb "Véglegesítés" feliratot mutat
  const [editStates, setEditStates] = useState(
    adat.reduce((acc, portfolio) => {
      acc[portfolio.id] = true;
      return acc;
    }, {})
  );

  // Egy külön állapot, ami a select aktuális értékét tárolja soronként (pl. "elfogad" vagy "elutasit")
  const [selectValues, setSelectValues] = useState(
    adat.reduce((acc, portfolio) => {
      acc[portfolio.id] = ""; // Kezdeti érték: üres, a felhasználónak kell választania
      return acc;
    }, {})
  );

  // A véglegesítés gomb most adja le a módosítást
  const handleFinalization = async (portfolioId) => {
    const value = selectValues[portfolioId];
    if (!value) {
      console.error("Nincs érték kiválasztva a portfólióhoz: " + portfolioId);
      return;
    }
    const newStatus = value === "elfogad" ? "Elfogadva" : "Elutasítva";
    try {
      await updatePortfolioStatus(portfolioId, newStatus);
      // Miután elküldtük a PATCH kéréset, disable-eljük a sor szerkesztését
      setEditStates((prev) => ({ ...prev, [portfolioId]: false }));
    } catch (error) {
      console.error("Hiba a portfólió státusz frissítése során:", error);
    }
  };

  // Az "Edit" gomb visszaengedéssel engedélyezi a sor szerkesztését
  const toggleEdit = (portfolioId) => {
    setEditStates((prev) => ({ ...prev, [portfolioId]: !prev[portfolioId] }));
  };

  // Ellenőrizzük, hogy minden portfólió sor véglegesítve van-e
  const allFinalized = adat.every((portfolio) => !editStates[portfolio.id]);

  const portfolioStatuszStilus = (allapot) => {
    switch (allapot) {
      case "Elfogadva":
        return "border-[1px] border-green-600 text-green-600";
      case "Elutasítva":
        return "border-[1px] border-red-700 text-red-700";
      case "Eldöntésre vár":
        return "border-[1px] border-blue-800 text-blue-800";
      default:
        return "border-[1px] border-light-blue-300 text-light-blue-300";
    }
  };

  const rows = adat.map((portfolio) => (
    <tr key={portfolio.id}>
      <td>{portfolio.tagozat ? "Nappali" : "Esti"}</td>
      <td>{portfolio.szak}</td>
      <td>
        <span
          className={`px-2 py-0.5 text-sm rounded-2xl w-max ${portfolioStatuszStilus(portfolio.allapot)}`}
        >
          {portfolio.allapot}
        </span>
      </td>
      <td>
        <a
          href={portfolio.portfolio_url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline-offset-2 hover:underline"
        >
          Link
        </a>
      </td>
      <td>
        <Select
          withinPortal={true}
          placeholder="Portfólió állapot..."
          data={[
            { value: "elfogad", label: "Elfogadva" },
            { value: "elutasit", label: "Elutasítva" },
          ]}
          // Ezzel tartjuk a kontrollált értéket:
          value={selectValues[portfolio.id]}
          onChange={(value) =>
            setSelectValues((prev) => ({ ...prev, [portfolio.id]: value }))
          }
          // A select disabled, ha a sor nincs edit módban:
          disabled={!editStates[portfolio.id]}
          style={{ width: 200 }}
        />
      </td>
      <td>
        <Button
          onClick={() => {
            if (editStates[portfolio.id]) {
              // Ha jelenleg szerkesztési módban van (select enabled), akkor a véglegesítés gomb küldi el a frissítést
              handleFinalization(portfolio.id);
            } else {
              // Ha nem, akkor engedélyezzük újra a szerkesztést
              toggleEdit(portfolio.id);
            }
          }}
        >
          {editStates[portfolio.id] ? (
            "Véglegesítés"
          ) : (
            <EditIcon fill={"white"} />
          )}
        </Button>
      </td>
    </tr>
  ));

  return (
    <>
      <Button
        className="my-4"
        disabled={!allFinalized}
        onClick={() => {
          const portfolioId = adat.length > 0 ? adat[0].id : null;
          if (!portfolioId) {
            console.error("Portfólió azonosító hiányzik");
            return;
          }
          sendPortfolioOsszegzo(portfolioId)
            .then((response) => {
              console.log("Összegző email sikeresen elküldve:", response);
            })
            .catch((error) => {
              console.error("Hiba az összegző email küldésekor:", error);
            });
        }}
      >
        Értékelés véglegesítése
      </Button>
      <Table>
        <thead>
          <tr>
            <th>Tagozat</th>
            <th>Szak</th>
            <th>Státusz</th>
            <th>Portfólió</th>
            <th>Állapot módosítása</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default AdminJelentkezokPortfolio;
