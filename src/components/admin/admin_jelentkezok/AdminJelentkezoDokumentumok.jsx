import { Tabs } from "@mantine/core";

function AdminJelentkezoDokumentumok({ adat }) {
  return (
    <Tabs variant="outline" orientation="vertical" defaultValue="gallery">
      <Tabs.List>
        {adat.map((dokumentum) => {
          console.log(dokumentum.id, dokumentum.dokumentumTipus);
          return (
            <Tabs.Tab value={`"${dokumentum.id}"`} key={dokumentum.id}>
              <p className="font-medium">{dokumentum.dokumentumTipus}</p>
            </Tabs.Tab>
          );
        })}
      </Tabs.List>

      {adat.map((dokumentum) => {
        return (
          <Tabs.Panel value={`"${dokumentum.id}"`} key={dokumentum.id}>
            <div className="p-4">{dokumentum.dokumentumTipus}</div>
          </Tabs.Panel>
        );
      })}
    </Tabs>
  );
}

export default AdminJelentkezoDokumentumok;
