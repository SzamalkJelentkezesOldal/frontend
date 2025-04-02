import { Button, Select } from "@mantine/core";
import { use, useContext } from "react";
import { useState } from "react";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import SubmitSpinner from "../../../icons/SubmitSpinner";

function AdminSzakJelentkezesekSorok({ jelentkezes, szakStatuszStilus }) {
  const [selected, setSelected] = useState(null);
  const { jelentkezesEldontese, jelentkezesEldontesLoader } = useContext(
    AdminJelentkezokContext
  );

  return (
    <tr key={jelentkezes.id}>
      <td>
        {jelentkezes.allapot < 5 || jelentkezes.allapot === 8
          ? "#."
          : `${jelentkezes.sorrend + 1}.`}
      </td>
      <td>{jelentkezes.tagozat ? "Nappali" : "Esti"}</td>
      <td>{jelentkezes.szak}</td>
      <td>
        <span
          className={`px-2 py-0.5 text-sm rounded-2xl w-max ${szakStatuszStilus(
            jelentkezes.allapot,
            jelentkezes.allapotszotar
          )}`}
        >
          {jelentkezes.allapot === 1
            ? "Jelentkezett"
            : jelentkezes.allapot < 5
              ? "Folyamatban"
              : jelentkezes.allapotszotar.elnevezes}
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
            jelentkezes.allapot < 5 ||
            jelentkezes.allapot === 6 ||
            jelentkezes.allapot === 8 ||
            jelentkezes.allapot === 7
          }
          value={selected}
          onChange={(value) => setSelected(value)}
        />
      </td>
      <td>
        <Button
          onClick={() =>
            jelentkezesEldontese({
              jelentkezes: jelentkezes.id,
              allapot: selected,
            })
          }
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
