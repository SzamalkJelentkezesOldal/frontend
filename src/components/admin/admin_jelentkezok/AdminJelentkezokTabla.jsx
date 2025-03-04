import React, { useContext } from "react";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";
import { MantineReactTable } from "mantine-react-table";
import {
  TextInput,
  Group,
  Select,
  Checkbox,
  MantineProvider,
  Box,
  Button,
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import AdminJelentkezokLenyilo from "./AdminJelentkezokLenyilo";

const AdminJelentkezokTabla = () => {
  const {
    columns,
    data,
    loading,
    totalCount,
    setSearchQuery,
    expanded,
    setExpanded,
    setSelectedFilter,
    setPagination,
    pagination,
    localization,
    handleExportRows,
    handleExportAllRows,
    handleExportData,
    exportMode,
    setExportMode,
    applyFilters,
    setApplyFilters,
  } = useContext(AdminJelentkezokContext);

  const renderDetailPanel = ({ row }) => {
    return (
      <div className="p-4 bg-gray-50">
        {console.log(row.original)}
        <AdminJelentkezokLenyilo adatok={row.original} />
      </div>
    );
  };

  const tableProps = {
    columns,
    data,
    state: {
      isLoading: loading,
      pagination,
      expanded: expanded,
    },
    mantineBottomToolbarProps: {
      className: "overflow-x-auto md:overflow-x-auto",
    },
    mantinePaginationProps: {
      className: "flex flex-wrap",
    },
    manualPagination: true,
    rowCount: totalCount,
    onPaginationChange: setPagination,
    enableExpanding: true,
    onExpandedChange: setExpanded,
    renderDetailPanel: renderDetailPanel,
    localization,

    renderTopToolbarCustomActions: ({ table }) => (
      <Group mb="md" spacing="md">
        <TextInput
          placeholder="Írja be a keresett emailt..."
          label="Globális keresés"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          style={{ width: 300 }}
        />
        <Select
          label="Jelentkezők szűrése"
          placeholder="Válasszon..."
          data={[
            { value: "1", label: "Összes jelentkező" },
            { value: "2", label: "Csak jelentkezett" },
            { value: "3", label: "Beiratkozás alatt" },
          ]}
          onChange={(value) => {
            setSelectedFilter(Number(value));
            setPagination({ pageIndex: 0, pageSize: 10 });
          }}
          style={{ width: 300 }}
        />
      </Group>
    ),
    renderBottomToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "8px",
          alignItems: "center",
        }}
      >
        <Group spacing="sm">
          <Select
            withinPortal="true"
            placeholder="Export módja"
            data={[
              { value: "current", label: "Jelenlegi oldal" },
              { value: "all", label: "Összes oldal" },
            ]}
            value={exportMode}
            onChange={(value) => {
              setExportMode(value);
              if (value === "current") {
                setApplyFilters(false);
              }
            }}
            style={{ width: 200 }}
          />
          <Checkbox
            label="Szűrők alkalmazása"
            checked={applyFilters}
            onChange={(event) => setApplyFilters(event.currentTarget.checked)}
            disabled={exportMode === "current"}
          />
        </Group>
        <Button
          color="lightblue"
          leftIcon={<IconDownload />}
          variant="filled"
          onClick={async () => {
            if (exportMode === "current") {
              handleExportRows(table.getRowModel().rows);
            } else {
              if (applyFilters) {
                await handleExportAllRows();
              } else {
                await handleExportData();
              }
            }
          }}
        >
          Exportálás
        </Button>
      </Box>
    ),
  };

  return (
    <div className="p-4 z-0">
      <MantineProvider
        theme={{
          primaryColor: "szPrimary",
          primaryShade: 5,
          colors: {
            szPrimary: [
              "#e6f3f3",
              "#cce7e7",
              "#99cfd0",
              "#66b8ba",
              "#33a0a3",
              "#00848b",
              "#007a80",
              "#006f73",
              "#005e64",
              "#004d55",
            ],
          },
        }}
      >
        <MantineReactTable {...tableProps} />
      </MantineProvider>
    </div>
  );
};

export default AdminJelentkezokTabla;
