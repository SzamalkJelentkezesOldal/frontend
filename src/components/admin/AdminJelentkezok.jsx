import { useContext } from "react";
import { AdminJelentkezokContext } from "../../context/admin/AdminJelentkezokContext";
import React from "react";

const AdminJelentkezokTabla = () => {
  const {
    table,
    flexRender,
    loading,
    columns,
    data,
    setPageIndex,
    setPageSize,
    pageCount,
    pageIndex,
    pageSize,
  } = useContext(AdminJelentkezokContext);

  return (
    <div className="p-4">
      {loading && <div className="mb-2 text-gray-600">Betöltés...</div>}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            // Minden sort egy React.Fragmentbe csomagolunk, hogy utána opcionálisan kibontott tartalmat is rendereljünk.
            <React.Fragment key={row.id}>
              <tr className="border-b border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-gray-300 text-sm text-gray-600"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {row.getIsExpanded() && (
                <tr>
                  <td colSpan={columns.length} className="bg-gray-100 p-4">
                    {/* Ide jöhet a kibontott tartalom – itt példaként megjelenítjük a név és státusz értékét */}
                    <div className="text-sm text-gray-700">
                      <p>
                        <strong>Név:</strong> {row.original.nev}
                      </p>
                      <p>
                        <strong>Státusz:</strong> {row.original.status}
                      </p>
                      {/* További részletek is megjeleníthetők itt */}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
          {data.length === 0 && !loading && (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-2 text-center text-gray-500"
              >
                Nincs adat.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination vezérlők */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Előző
        </button>
        <span className="text-sm text-gray-700">
          Oldal <strong>{pageIndex + 1}</strong> / <strong>{pageCount}</strong>
        </span>
        <button
          onClick={() =>
            setPageIndex((old) => Math.min(old + 1, pageCount - 1))
          }
          disabled={pageIndex >= pageCount - 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Következő
        </button>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0); // az oldalváltásnál visszaállunk az első oldalra
          }}
          className="ml-4 p-1 border rounded text-sm"
        >
          {[10, 20, 30].map((size) => (
            <option key={size} value={size}>
              {size} sor
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AdminJelentkezokTabla;
