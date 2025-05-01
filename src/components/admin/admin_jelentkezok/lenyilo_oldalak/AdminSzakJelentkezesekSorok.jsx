import { Button, Select } from "@mantine/core";
import { useContext, useState, useEffect } from "react";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import SubmitSpinner from "../../../icons/SubmitSpinner";

function AdminSzakJelentkezesekSorok({
  jelentkezes,
  szakStatuszStilus,
  onUpdate,
}) {
  const [selected, setSelected] = useState(null);
  const [localJelentkezes, setLocalJelentkezes] = useState(jelentkezes);
  const { jelentkezesEldontese, jelentkezesEldontesLoader } = useContext(
    AdminJelentkezokContext
  );

  useEffect(() => {
    setLocalJelentkezes(jelentkezes);
  }, [jelentkezes]);

  const handleJelentkezesEldontese = async () => {
    if (!selected) return;

    const frissitettJelentkezes = await jelentkezesEldontese({
      jelentkezes: localJelentkezes.id,
      allapot: selected,
    });

    if (frissitettJelentkezes) {
      const updatedJelentkezes = {
        ...localJelentkezes,
        allapot: parseInt(selected),
        allapotszotar: {
          ...localJelentkezes.allapotszotar,
          elnevezes: selected === "7" ? "Elfogadva" : "Elutasítva",
        },
      };

      setLocalJelentkezes(updatedJelentkezes);

      if (onUpdate) {
        onUpdate(updatedJelentkezes);
      }

      setSelected(null);
    }
  };

  return (
    <tr key={localJelentkezes.id}>
      <td>
        {localJelentkezes.allapot < 5 || localJelentkezes.allapot === 8
          ? "#."
          : `${localJelentkezes.sorrend + 1}.`}
      </td>
      <td>{localJelentkezes.tagozat ? "Nappali" : "Esti"}</td>
      <td>{localJelentkezes.szak}</td>
      <td>
        <span
          className={`px-2 py-0.5 text-sm rounded-2xl w-max ${szakStatuszStilus(
            localJelentkezes.allapot,
            localJelentkezes.allapotszotar
          )}`}
        >
          {localJelentkezes.allapot === 1
            ? "Jelentkezett"
            : localJelentkezes.allapot < 5
              ? "Folyamatban"
              : localJelentkezes.allapotszotar.elnevezes}
        </span>
      </td>
      <td>
        <Select
          withinPortal
          placeholder="Jelentkezés állapot..."
          data={[
            { value: "7", label: "Elfogadva" },
            { value: "8", label: "Elutasítva" },
          ]}
          allowDeselect
          style={{ width: 200 }}
          disabled={
            localJelentkezes.allapot < 5 ||
            localJelentkezes.allapot === 6 ||
            localJelentkezes.allapot === 8 ||
            localJelentkezes.allapot === 7
          }
          value={selected}
          onChange={(value) => setSelected(value)}
        />
      </td>
      <td>
        <Button
          onClick={handleJelentkezesEldontese}
          disabled={!selected || jelentkezesEldontesLoader}
        >
          {jelentkezesEldontesLoader ? <SubmitSpinner /> : ""}
          Véglegesít
        </Button>
      </td>
    </tr>
  );
}

export default AdminSzakJelentkezesekSorok;
