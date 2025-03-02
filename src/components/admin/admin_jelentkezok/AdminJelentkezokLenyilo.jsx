import { Tabs, Text, Timeline } from "@mantine/core";
import SzakSorrendIcon from "../../icons/SzakSorrendIcon";
import SzemelyAdatokIcon from "../../icons/SzemelyAdatokIcon";
import DokumentumokIcon from "../../icons/DokumentumokIcon";
import TimelineIcon from "../../icons/TimelineIcon";
import {
  IconGitBranch,
  IconGitPullRequest,
  IconGitCommit,
  IconMessageDots,
} from "@tabler/icons-react";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";
import { useContext } from "react";

function AdminJelentkezokLenyilo({ adatok }) {
  const { idoMegjelenites } = useContext(AdminJelentkezokContext);

  return (
    <Tabs color="cyan" radius="md" defaultValue="jelentkezesek">
      <Tabs.List>
        <Tabs.Tab value="jelentkezesek">
          <div className="flex items-center gap-2">
            <SzakSorrendIcon />
            <span className="font-medium">Jelentkezések</span>
          </div>
        </Tabs.Tab>
        <Tabs.Tab value="torzsadatok">
          <div className="flex items-center gap-2">
            <SzemelyAdatokIcon />
            <span className="font-medium">Törzsadatok</span>
          </div>
        </Tabs.Tab>
        <Tabs.Tab value="dokumentumok">
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
        <div className="p-4">
          <p>adat</p>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="torzsadatok">Messages tab content</Tabs.Panel>

      <Tabs.Panel value="dokumentumok">Settings tab content</Tabs.Panel>

      <Tabs.Panel value="idovonal">
        <div className="p-4">
          <Timeline
            active={adatok?.jelentkezesek[0]?.allapot - 1}
            bulletSize={32}
            lineWidth={3}
          >
            <Timeline.Item
              bullet={<IconGitBranch size={12} />}
              title="Jelentkezett"
              lineVariant={
                adatok?.jelentkezesek[0]?.allapot - 1 > 0
                  ? "solid"
                  : adatok?.jelentkezesek[0]?.allapot - 1 === 0
                    ? "dashed"
                    : "dotted"
              }
            >
              <Text c="dimmed" size="sm">
                A jelentkező leadta a jelentkezését a szakokra.
              </Text>
              <Text size="xs" mt={4}>
                {adatok?.jelentkezesek[0]?.allapot >= 1
                  ? idoMegjelenites(adatok?.jelentkezett)
                  : "----.--.-- --:--:--"}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<IconGitCommit size={12} />}
              title="Regisztrált"
              lineVariant={
                adatok?.jelentkezesek[0]?.allapot - 1 > 1
                  ? "solid"
                  : adatok?.jelentkezesek[0]?.allapot - 1 === 1
                    ? "dashed"
                    : "dotted"
              }
            >
              <Text c="dimmed" size="sm">
                A jelentkező beregisztrált, hogy elkezdje a beiratkozási
                folyamatot.
              </Text>
              <Text size="xs" mt={4}>
                {adatok?.jelentkezesek[0]?.allapot >= 2
                  ? idoMegjelenites(adatok?.beregisztralt)
                  : "----.--.-- --:--:--"}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Törzsadatokat feltöltötte"
              bullet={<IconGitPullRequest size={12} />}
              lineVariant={
                adatok?.jelentkezesek[0]?.allapot - 1 > 2
                  ? "solid"
                  : adatok?.jelentkezesek[0]?.allapot - 1 === 2
                    ? "dashed"
                    : "dotted"
              }
            >
              <Text c="dimmed" size="sm">
                A jelentkező feltöltötte a törzsadatokat.
              </Text>
              <Text size="xs" mt={4}>
                {adatok?.jelentkezesek[0]?.allapot >= 3
                  ? adatok?.torzsadatok &&
                    idoMegjelenites(adatok?.torzsadatok?.created_at)
                  : "----.--.-- --:--:--"}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Dokumentumokat feltöltötte"
              bullet={<IconGitPullRequest size={12} />}
              lineVariant={
                adatok?.jelentkezesek[0]?.allapot - 1 > 3
                  ? "solid"
                  : adatok?.jelentkezesek[0]?.allapot - 1 === 3
                    ? "dashed"
                    : "dotted"
              }
            >
              <Text c="dimmed" size="sm">
                A jelentkező feltöltötte a dokumentumokat.
              </Text>
              <Text size="xs" mt={4}>
                {adatok?.jelentkezesek[0]?.allapot >= 4
                  ? adatok?.dokumentumok?.[0]?.created_at &&
                    idoMegjelenites(adatok.dokumentumok[0].created_at)
                  : "----.--.-- --:--:--"}
              </Text>
            </Timeline.Item>

            <Timeline.Item
              title="Beiratkozást elküldte"
              bullet={<IconMessageDots size={12} />}
            >
              <Text c="dimmed" size="sm">
                A jelentkező elküldte a beiratkozását.
              </Text>
              <Text size="xs" mt={4}>
                {adatok?.jelentkezesek[0]?.allapot >= 5
                  ? idoMegjelenites(adatok?.jelentkezesek[0]?.updated_at)
                  : "----.--.-- --:--:--"}
              </Text>
            </Timeline.Item>
          </Timeline>
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}

export default AdminJelentkezokLenyilo;
