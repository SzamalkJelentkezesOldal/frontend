import { Button, CheckIcon, Select, Table } from "@mantine/core";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import { useContext, useState } from "react";
import EditIcon from "../../../icons/EditIcon";
import SubmitSpinner from "../../../icons/SubmitSpinner"; // Győződj meg róla, hogy létezik

function AdminJelentkezokPortfolio({ adat, setPortfoliosData, regisztralt }) {
  const { updatePortfolioStatus, sendPortfolioOsszegzo } = useContext(
    AdminJelentkezokContext
  );

  // Tárold a portfóliókat lokálisan, hogy módosíthatóak legyenek
  const [portfolios, setPortfolios] = useState(adat);

  // Inicializáljuk az editStates-t úgy, hogy ha egy portfólió allapota "Eldöntésre vár", akkor az editable legyen (true)
  const [editStates, setEditStates] = useState(
    portfolios.reduce((acc, portfolio) => {
      acc[portfolio.id] = portfolio.allapot === "Eldöntésre vár";
      return acc;
    }, {})
  );

  // Inicializáljuk a selectValues-t a backendből kapott értékek alapján:
  const [selectValues, setSelectValues] = useState(
    portfolios.reduce((acc, portfolio) => {
      if (portfolio.allapot === "Elfogadva") {
        acc[portfolio.id] = "elfogad";
      } else if (portfolio.allapot === "Elutasítva") {
        acc[portfolio.id] = "elutasit";
      } else {
        acc[portfolio.id] = "";
      }
      return acc;
    }, {})
  );

  // loading state az egyes portfólió sorokhoz
  const [loadingStates, setLoadingStates] = useState(
    portfolios.reduce((acc, portfolio) => {
      acc[portfolio.id] = false;
      return acc;
    }, {})
  );

  const [loadingSummary, setLoadingSummary] = useState(false);

  const disableEditing = regisztralt;

  // PATCH API hívás véglegesítéskor, majd a local state frissítése
  const handleFinalization = async (portfolioId) => {
    if (disableEditing) return;
    const value = selectValues[portfolioId];
    if (!value) {
      console.error("Nincs érték kiválasztva a portfólióhoz: " + portfolioId);
      return;
    }
    const newStatus = value === "elfogad" ? "Elfogadva" : "Elutasítva";
    try {
      setLoadingStates((prev) => ({ ...prev, [portfolioId]: true }));
      await updatePortfolioStatus(portfolioId, newStatus);
      // Update local state: az adott portfólió allapotát frissítjük
      setPortfolios((prev) =>
        prev.map((pf) =>
          pf.id === portfolioId ? { ...pf, allapot: newStatus } : pf
        )
      );
      // Megváltoztatjuk a selectValues-t is, hogy a végleges érték legyen
      setSelectValues((prev) => ({
        ...prev,
        [portfolioId]: newStatus === "Elfogadva" ? "elfogad" : "elutasit",
      }));
      // Véglegesítés után letiltjuk a szerkesztést
      setEditStates((prev) => ({ ...prev, [portfolioId]: false }));
    } catch (error) {
      console.error("Hiba a portfólió státusz frissítése során:", error);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [portfolioId]: false }));
    }
  };

  // Cancel gomb: visszaállítja az eredeti értéket (amit a backendből kaptunk)
  const cancelEdit = (portfolioId) => {
    setSelectValues((prev) => ({
      ...prev,
      [portfolioId]:
        portfolios.find((pf) => pf.id === portfolioId).allapot === "Elfogadva"
          ? "elfogad"
          : portfolios.find((pf) => pf.id === portfolioId).allapot ===
              "Elutasítva"
            ? "elutasit"
            : "",
    }));
    setEditStates((prev) => ({ ...prev, [portfolioId]: false }));
  };

  // Toggle gomb: ha a sor nincs szerkesztési módban, engedélyezi újra a szerkesztést
  const toggleEdit = (portfolioId) => {
    setEditStates((prev) => ({ ...prev, [portfolioId]: !prev[portfolioId] }));
  };

  // Az összes portfólió véglegesítve van, ha minden sorban editStates false
  const allFinalized = portfolios.every(
    (portfolio) => !editStates[portfolio.id]
  );

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

  const rows = portfolios.map((portfolio) => (
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
          value={selectValues[portfolio.id]}
          onChange={(value) =>
            setSelectValues((prev) => ({ ...prev, [portfolio.id]: value }))
          }
          disabled={!editStates[portfolio.id]}
          style={{ width: 200 }}
        />
      </td>
      <td>
        {editStates[portfolio.id] ? (
          <div className="flex items-center">
            <Button
              onClick={() => handleFinalization(portfolio.id)}
              size="xs"
              disabled={loadingStates[portfolio.id]}
            >
              {loadingStates[portfolio.id] ? <SubmitSpinner /> : "Véglegesítés"}
            </Button>
            {portfolio.allapot !== "Eldöntésre vár" ? (
              <Button
                onClick={() => cancelEdit(portfolio.id)}
                size="xs"
                variant="outline"
                color="red"
                style={{ marginLeft: 5 }}
                disabled={loadingStates[portfolio.id]}
              >
                X
              </Button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <Button
            onClick={() => toggleEdit(portfolio.id)}
            size="xs"
            disabled={loadingStates[portfolio.id] || disableEditing}
          >
            {loadingStates[portfolio.id] ? (
              <SubmitSpinner size="xs" />
            ) : (
              <EditIcon fill="lightGray" />
            )}
          </Button>
        )}
      </td>
    </tr>
  ));

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          className="my-4 flex justify-center"
          disabled={!allFinalized || loadingSummary}
          onClick={() => {
            // Használjuk a portfóliók tömbének első elemét az összegző API híváshoz.
            const portfolioId = portfolios.length > 0 ? portfolios[0].id : null;
            if (!portfolioId) {
              console.error("Portfólió azonosító hiányzik.");
              return;
            }
            setLoadingSummary(true);
            sendPortfolioOsszegzo(portfolioId)
              .then((response) => {
                console.log("Összegző email sikeresen elküldve:", response);
                setPortfolios((prev) =>
                  prev.map((pf) =>
                    pf.id === portfolioId ? { ...pf, ertesito: true } : pf
                  )
                );
                setPortfoliosData((prev) =>
                  prev.map((pf) => ({ ...pf, ertesito: true }))
                );
              })
              .catch((error) => {
                console.error("Hiba az összegző email küldésekor:", error);
              })
              .finally(() => setLoadingSummary(false));
          }}
        >
          {loadingSummary ? <SubmitSpinner /> : "Értesítő kiküldése"}
        </Button>
        {portfolios[0].ertesito ? (
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1 border border-1 border-green-600 rounded-[4px] px-2 py-1">
            Értesítő már kiküldve <CheckIcon className="w-3" />
          </p>
        ) : (
          <></>
        )}
      </div>
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
