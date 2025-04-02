import { Text, Timeline } from "@mantine/core";
import { useContext } from "react";
import { AdminJelentkezokContext } from "../../../../context/admin/AdminJelentkezokContext";
import UserAddIcon from "../../../icons/UserAddIcon";
import UserCheckIcon from "../../../icons/UserCheckIcon";
import CheckIcon from "../../../icons/CheckIcon";
import SzemelyAdatokIcon from "../../../icons/SzemelyAdatokIcon";
import DokumentumokIcon from "../../../icons/DokumentumokIcon";

function AdminJelentkezoIdovonal({ adatok, minAllapot }) {
  const { idoMegjelenites } = useContext(AdminJelentkezokContext);

  const activeIndex = minAllapot - 1;

  return (
    <Timeline active={activeIndex} bulletSize={32} lineWidth={3}>
      <Timeline.Item
        bullet={
          <UserAddIcon
            fill={minAllapot - 1 >= 0 ? "white" : "black"}
            size={20}
          />
        }
        title="Jelentkezett"
        lineVariant={
          minAllapot - 1 > 0
            ? "solid"
            : minAllapot - 1 === 0
              ? "dashed"
              : "dotted"
        }
      >
        <Text c="dimmed" size="sm">
          A jelentkező leadta a jelentkezését a szakokra.
        </Text>
        <Text size="xs" mt={4}>
          {minAllapot >= 1
            ? idoMegjelenites(adatok?.jelentkezett)
            : "----.--.-- --:--:--"}
        </Text>
      </Timeline.Item>

      <Timeline.Item
        bullet={
          <UserCheckIcon
            fill={minAllapot - 1 >= 1 ? "white" : "black"}
            size={20}
          />
        }
        title="Regisztrált"
        lineVariant={
          minAllapot - 1 > 1
            ? "solid"
            : minAllapot - 1 === 1
              ? "dashed"
              : "dotted"
        }
      >
        <Text c="dimmed" size="sm">
          A jelentkező beregisztrált, hogy elkezdje a beiratkozási folyamatot.
        </Text>
        <Text size="xs" mt={4}>
          {minAllapot >= 2
            ? idoMegjelenites(adatok?.beregisztralt)
            : "----.--.-- --:--:--"}
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title="Törzsadatokat feltöltötte"
        bullet={
          <SzemelyAdatokIcon
            fill={minAllapot - 1 >= 2 ? "white" : "black"}
            size={20}
          />
        }
        lineVariant={
          minAllapot - 1 > 2
            ? "solid"
            : minAllapot - 1 === 2
              ? "dashed"
              : "dotted"
        }
      >
        <Text c="dimmed" size="sm">
          A jelentkező feltöltötte a törzsadatokat.
        </Text>
        <Text size="xs" mt={4}>
          {minAllapot >= 3 && adatok?.torzsadatok
            ? idoMegjelenites(adatok.torzsadatok.created_at)
            : "----.--.-- --:--:--"}
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title="Dokumentumokat feltöltötte"
        bullet={
          <DokumentumokIcon
            fill={minAllapot - 1 >= 3 ? "white" : "black"}
            size={20}
          />
        }
        lineVariant={
          minAllapot - 1 > 3
            ? "solid"
            : minAllapot - 1 === 3
              ? "dashed"
              : "dotted"
        }
      >
        <Text c="dimmed" size="sm">
          A jelentkező feltöltötte a dokumentumokat.
        </Text>
        <Text size="xs" mt={4}>
          {minAllapot >= 4 && adatok?.dokumentumok?.[0]?.created_at
            ? idoMegjelenites(adatok.dokumentumok[0].created_at)
            : "----.--.-- --:--:--"}
        </Text>
      </Timeline.Item>

      <Timeline.Item
        title="Beiratkozást elküldte"
        bullet={
          <CheckIcon fill={minAllapot - 1 >= 4 ? "white" : "black"} size={20} />
        }
      >
        <Text c="dimmed" size="sm">
          A jelentkező elküldte a beiratkozását.
        </Text>
        <Text size="xs" mt={4}>
          {minAllapot >= 5 && adatok?.jelentkezesek?.[0]?.updated_at
            ? idoMegjelenites(adatok.jelentkezesek[0].updated_at)
            : "----.--.-- --:--:--"}
        </Text>
      </Timeline.Item>
    </Timeline>
  );
}

export default AdminJelentkezoIdovonal;
