import { Tabs } from "@mantine/core";
import SzakSorrendIcon from "../../icons/SzakSorrendIcon";
import SzemelyAdatokIcon from "../../icons/SzemelyAdatokIcon";
import DokumentumokIcon from "../../icons/DokumentumokIcon";
import TimelineIcon from "../../icons/TimelineIcon";
import AdminSzakJelentkezesek from "./AdminSzakJelentkezesek";
import AdminJelentkezoTorzsadatok from "./AdminJelentkezoTorzsadatok";
import AdminJelentkezoDokumentumok from "./AdminJelentkezoDokumentumok";
import AdminJelentkezoIdovonal from "./AdminJelentkezoIdovonal";

function AdminJelentkezokLenyilo({ adatok }) {
  const minAllapot =
    adatok?.jelentkezesek && adatok?.jelentkezesek?.length > 0
      ? Math.min(...adatok.jelentkezesek.map((j) => j.allapot))
      : 0;

  return (
    <Tabs color="cyan" radius="md" defaultValue="jelentkezesek">
      <Tabs.List>
        <Tabs.Tab value="jelentkezesek">
          <div className="flex items-center gap-2">
            <SzakSorrendIcon />
            <span className="font-medium">Jelentkezések</span>
          </div>
        </Tabs.Tab>
        <Tabs.Tab value="torzsadatok" disabled={minAllapot < 3}>
          <div className="flex items-center gap-2">
            <SzemelyAdatokIcon />
            <span className="font-medium">Törzsadatok</span>
          </div>
        </Tabs.Tab>
        <Tabs.Tab
          value="dokumentumok"
          disabled={!(adatok.dokumentumok?.length > 0) || !adatok.dokumentumok}
        >
          <div className="flex items-center gap-2">
            <DokumentumokIcon />
            <span className="font-medium">Dokumentumok</span>
          </div>
        </Tabs.Tab>
        <Tabs.Tab value="idovonal" ml="auto">
          <div className="flex items-center gap-2">
            <TimelineIcon />
            <span className="font-medium">Idővonal</span>
          </div>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="jelentkezesek">
        <div className="p-4 ">
          <AdminSzakJelentkezesek adat={adatok.jelentkezesek} />
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="torzsadatok">
        <div className="p-4 w-2/3">
          <AdminJelentkezoTorzsadatok adat={adatok?.torzsadatok} />
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="dokumentumok">
        <div className="p-4">
          <AdminJelentkezoDokumentumok adat={adatok?.dokumentumok} />
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="idovonal">
        <div className="p-4">
          <AdminJelentkezoIdovonal adatok={adatok} minAllapot={minAllapot} />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}

export default AdminJelentkezokLenyilo;
