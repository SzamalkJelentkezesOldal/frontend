import { Select, Table } from "@mantine/core";

function AdminSzakJelentkezesek({ adat }) {
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

  const rows = adat.map((jelentkezes) => (
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
          withinPortal="true"
          placeholder="Jelentkezés állapot"
          data={[
            { value: "elfogad", label: "Elfogadva" },
            { value: "elutasit", label: "Elutasítva" },
          ]}
          allowDeselect
          style={{ width: 200 }}
        />
      </td>
    </tr>
  ));

  return (
    <Table>
      <thead>
        <tr>
          <th>Sorrend</th>
          <th>Tagozat</th>
          <th>Szak</th>
          <th>Státusz</th>
          <th />
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default AdminSzakJelentkezesek;
