import { Tabs } from "@mantine/core";
import AdminJelentkezoDokumentumViewer from "./AdminJelentkezoDokumentumViewer";

function AdminJelentkezoDokumentumok({ adat }) {
  return (
    <Tabs
      variant="outline"
      orientation="vertical"
      defaultValue={`${adat[0]?.id}`}
    >
      <Tabs.List>
        {adat.map((dokumentum) => (
          <Tabs.Tab value={`${dokumentum.id}`} key={dokumentum.id}>
            <p className="font-medium">{dokumentum.dokumentumTipus}</p>
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {adat.map((dokumentum) => (
        <Tabs.Panel value={`${dokumentum.id}`} key={dokumentum.id}>
          <div className="p-4 min-w-full max-h-full">
            <AdminJelentkezoDokumentumViewer
              previewUrls={dokumentum.previewUrls}
            />
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
}

export default AdminJelentkezoDokumentumok;
