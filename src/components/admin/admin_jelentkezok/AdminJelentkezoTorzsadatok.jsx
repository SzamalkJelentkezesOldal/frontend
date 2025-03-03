import {
  Table,
  CopyButton,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";

function AdminJelentkezoTorzsadatok({ adat }) {
  const theme = useMantineTheme();

  const copyButtonStyles = {
    root: {
      cursor: "copy",
      borderRadius: theme.radius.sm,
      padding: "4px",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "rgba(0, 132, 139, 0.1)",
      },
    },
  };

  const renderCopyCell = (value) => (
    <CopyButton value={value} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip
          openDelay={800}
          label={copied ? "Vágólapra másolva" : "Kattints a másoláshoz"}
          color={copied ? "green" : undefined}
        >
          <Text
            onClick={copy}
            sx={copyButtonStyles.root}
            style={{ userSelect: "none" }}
          >
            {value}
          </Text>
        </Tooltip>
      )}
    </CopyButton>
  );

  return (
    <Table
      variant="vertical"
      withBorder
      highlightOnHover
      className="w-max"
      sx={{
        td: { padding: "4px" },
        th: {
          backgroundColor: theme.fn.rgba(theme.colors.gray[2], 0.5),
        },
      }}
    >
      <tbody>
        <tr>
          <th className="w-[150px]">Vezetéknév</th>
          <td>{renderCopyCell(adat.vezeteknev)}</td>
        </tr>
        <tr>
          <th>Keresztnév</th>
          <td>{renderCopyCell(adat.keresztnev)}</td>
        </tr>
        <tr>
          <th>Születési név</th>
          <td>{renderCopyCell(adat.szuletesi_nev)}</td>
        </tr>
        <tr>
          <th>Állampolgárság</th>
          <td>{renderCopyCell(adat.allampolgarsag)}</td>
        </tr>
        <tr>
          <th>Anyja neve</th>
          <td>{renderCopyCell(adat.anyja_neve)}</td>
        </tr>
        <tr>
          <th>Lakcím</th>
          <td>{renderCopyCell(adat.lakcim)}</td>
        </tr>
        <tr>
          <th>Születési dátum</th>
          <td>{renderCopyCell(adat.szuletesi_datum)}</td>
        </tr>
        <tr>
          <th>Születési hely</th>
          <td>{renderCopyCell(adat.szuletesi_hely)}</td>
        </tr>
        <tr>
          <th>Adóazonosító</th>
          <td>{renderCopyCell(adat.adoazonosito || "Nincs adat")}</td>
        </tr>
        <tr>
          <th>TAJ szám</th>
          <td>{renderCopyCell(adat.taj_szam || "Nincs adat")}</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default AdminJelentkezoTorzsadatok;
