import React, { useContext } from "react";
import { AdminJelentkezokContext } from "../../../context/admin/AdminJelentkezokContext";
import { MantineReactTable } from "mantine-react-table";
import { TextInput, Group, Select } from "@mantine/core";

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
  } = useContext(AdminJelentkezokContext);

  const renderDetailPanel = ({ row }) => {
    return (
      <div className="p-4 bg-gray-50">
        <h3 className="text-lg font-bold mb-2">Jelentkező részletes adatai</h3>
        <p>
          <strong>Név:</strong> {row.original.nev}
        </p>
        <p>
          <strong>Email:</strong> {row.original.email}
        </p>
        <p>
          <strong>Státusz:</strong> {row.original.status}
        </p>
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
    manualPagination: true,
    rowCount: totalCount,
    onPaginationChange: setPagination,
    enableExpanding: true,
    onExpandedChange: setExpanded,
    renderDetailPanel: renderDetailPanel,
    renderTopToolbarCustomActions: ({ table }) => (
      <Group mb="md" spacing="md">
        <TextInput
          placeholder="Írja be a keresett kifejezést..."
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
  };

  return (
    <div className="p-4">
      <MantineReactTable {...tableProps} />
    </div>
  );
};

export default AdminJelentkezokTabla;
