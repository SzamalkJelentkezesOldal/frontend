import { Tabs } from "@mantine/core";
import SzakSorrendIcon from "../../icons/SzakSorrendIcon";
import SzemelyAdatokIcon from "../../icons/SzemelyAdatokIcon";
import DokumentumokIcon from "../../icons/DokumentumokIcon";
import PortfolioIcon from "../../icons/PortfolioIcon";
import TimelineIcon from "../../icons/TimelineIcon";
import AdminSzakJelentkezesek from "./lenyilo_oldalak/AdminSzakJelentkezesek";
import AdminJelentkezoTorzsadatok from "./lenyilo_oldalak/AdminJelentkezoTorzsadatok";
import AdminJelentkezoDokumentumok from "./lenyilo_oldalak/AdminJelentkezoDokumentumok";
import AdminJelentkezoIdovonal from "./lenyilo_oldalak/AdminJelentkezoIdovonal";
import AdminJelentkezokPortfolio from "./lenyilo_oldalak/AdminJelentkezokPortfolio";

function AdminJelentkezokLenyilo({ adatok }) {
  const minAllapot =
    adatok?.jelentkezesek && adatok?.jelentkezesek?.length > 0
      ? Math.min(...adatok.jelentkezesek.map((j) => j.allapot))
      : 0;

  return (
    <Tabs
      color="cyan"
      radius="md"
      defaultValue={
        adatok.portfoliok?.length > 0 ? "portfolio" : "jelentkezesek"
      }
    >
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
        {adatok.portfoliok?.length > 0 ? (
          <Tabs.Tab value="portfolio">
            <div className="flex items-center gap-2">
              <PortfolioIcon />
              <span className="font-medium">Portfólió</span>
            </div>
          </Tabs.Tab>
        ) : null}
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

      {adatok.portfoliok?.length > 0 ? (
        <Tabs.Panel value="portfolio">
          <div className="p-4">
            <AdminJelentkezokPortfolio adat={adatok?.portfoliok} />
          </div>
        </Tabs.Panel>
      ) : null}
      <Tabs.Panel value="idovonal">
        <div className="p-4">
          <AdminJelentkezoIdovonal adatok={adatok} minAllapot={minAllapot} />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}

export default AdminJelentkezokLenyilo;
