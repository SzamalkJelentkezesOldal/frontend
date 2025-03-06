import React, { useContext, useState } from "react";
import { Modal, Checkbox, Select, Button, Group, Divider } from "@mantine/core";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";

const AdminJelentkezoModositasKerelem = ({
  opened,
  onClose,
  torzsadatok,
  dokumentumok,
  email,
}) => {
  const [selectedTorzsadat, setSelectedTorzsadat] = useState({});
  const [selectedDokumentum, setSelectedDokumentum] = useState({});
  const { handleModositasKerelemEmail } = useContext(AdminJelentkezokContext);

  const torzsadatSelect = [
    { value: "hibasAdat", label: "Hibás adat" },
    { value: "egyeni", label: "Egyéni indok" },
  ];

  const dokumentumokSelect = [
    { value: "hibasAdat", label: "Hibás adat" },
    { value: "hiany", label: "Hiányos adat" },
    { value: "rosszMinoseg", label: "Rossz minőség" },
    { value: "egyeni", label: "Egyéni indok" },
  ];

  const labelMap = {
    vezeteknev: "Vezetéknév",
    keresztnev: "Keresztnév",
    adoazonosito: "Adóazonosító",
    lakcim: "Lakcím",
    taj_szam: "TAJ szám",
    szuletesi_hely: "Születési hely",
    szuletesi_nev: "Születési név",
    szuletesi_datum: "Születési dátum",
    allampolgarsag: "Állampolgárság",
    anyja_neve: "Anyja neve",
  };

  const handleTorzsadatToggle = (key) => {
    setSelectedTorzsadat((prev) => {
      const newState = { ...prev };
      if (newState.hasOwnProperty(key)) {
        delete newState[key];
      } else {
        newState[key] = "";
      }
      return newState;
    });
  };

  const handleDokumentumToggle = (id) => {
    setSelectedDokumentum((prev) => {
      const newState = { ...prev };
      if (newState.hasOwnProperty(id)) {
        delete newState[id];
      } else {
        newState[id] = "";
      }
      return newState;
    });
  };

  const handleTorzsadatSelect = (key, value) => {
    setSelectedTorzsadat((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDokumentumSelect = (id, value) => {
    setSelectedDokumentum((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleKuldes = async () => {
    const emailData = {
      email,
      torzsadatok,
      dokumentumok,
      selectedTorzsadat,
      selectedDokumentum,
    };

    await handleModositasKerelemEmail(emailData);
    setSelectedDokumentum({});
    setSelectedTorzsadat({});
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Módosítás kérelem">
      <div>
        {torzsadatok && (
          <div>
            <h3>Törzsadatok</h3>
            {Object.entries(torzsadatok)
              .filter(
                ([key]) =>
                  !["jelentkezo_id", "created_at", "updated_at"].includes(key)
              )
              .map(([key, value]) => {
                const label = labelMap[key] || key;
                return (
                  <Group
                    key={key}
                    direction="column"
                    mt="sm"
                    className="flex flex-col items-start"
                  >
                    <Checkbox
                      label={`${label}: ${value ? value : "-"}`}
                      onChange={() => handleTorzsadatToggle(key)}
                      disabled={!value}
                      checked={selectedTorzsadat.hasOwnProperty(key)}
                    />
                    {selectedTorzsadat.hasOwnProperty(key) && (
                      <Select
                        data={torzsadatSelect}
                        placeholder="Válassz opciót"
                        style={{ marginLeft: 24, marginBottom: 6 }}
                        allowDeselect
                        onChange={(value) => handleTorzsadatSelect(key, value)}
                        value={selectedTorzsadat[key] || null}
                      />
                    )}
                  </Group>
                );
              })}
          </div>
        )}

        <Divider className="mt-6" />

        {dokumentumok && dokumentumok.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <h3>Dokumentumok</h3>
            {dokumentumok.map((doc) => (
              <Group
                key={doc.id}
                direction="column"
                mt="sm"
                className="flex flex-col items-start"
              >
                <Checkbox
                  label={doc.dokumentumTipus || "Dokumentum"}
                  onChange={() => handleDokumentumToggle(doc.id)}
                  checked={selectedDokumentum.hasOwnProperty(doc.id)}
                />
                {selectedDokumentum.hasOwnProperty(doc.id) && (
                  <Select
                    data={dokumentumokSelect}
                    placeholder="Válassz opciót"
                    style={{ marginLeft: 24, marginBottom: 6 }}
                    allowDeselect
                    onChange={(value) => handleDokumentumSelect(doc.id, value)}
                    value={selectedDokumentum[doc.id] || null}
                  />
                )}
              </Group>
            ))}
          </div>
        )}

        <Divider className="mt-6" />

        <Button onClick={handleKuldes} mt="xl">
          Kérelem küldése
        </Button>
      </div>
    </Modal>
  );
};

export default AdminJelentkezoModositasKerelem;
