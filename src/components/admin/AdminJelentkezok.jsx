// AdminJelentkezok.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

// TanStack Table hookok importálása
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// Importáljuk a shadcn/ui Data Table komponenseit
// (Győződj meg róla, hogy a shadcn/ui telepítve van, illetve a komponensek elérhetők a megadott útvonalon)
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// Oszlopdefiníciók: email, név és státusz
const columns = [
  {
    accessorKey: "email",
    header: "Email",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "name",
    header: "Név",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "status",
    header: "Státusz",
    cell: (info) => info.getValue(),
  },
];

const AdminJelentkezok = () => {
  // Állapotok az adatokhoz és az oldalazáshoz
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0); // összes oldal száma
  const [pageIndex, setPageIndex] = useState(0); // 0-indexelt
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);

  // Adatlekérési függvény: axios-szal kérjük le az aktuális oldalt
  const fetchData = async () => {
    setLoading(true);
    try {
      // Az API úgy várja a paramétereket, hogy a "page" 1-indexelt, "limit" pedig az oldalon megjelenítendő sorok száma
      const response = await axios.get(
        "https://your-backend-endpoint.com/api/users",
        {
          params: {
            page: pageIndex + 1,
            limit: pageSize,
          },
        }
      );
      // Tegyük fel, hogy az API a következő formátumban adja vissza az adatokat:
      // { results: [...], totalCount: number }
      const { results, totalCount } = response.data;
      setData(results);
      setPageCount(Math.ceil(totalCount / pageSize));
    } catch (error) {
      console.error("Hiba az adatok lekérésekor:", error);
    }
    setLoading(false);
  };

  // Adatlekérés a pageIndex vagy pageSize változásakor
  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  // TanStack Table inicializálása
  const table = useReactTable({
    data,
    columns,
    manualPagination: true, // szerveroldali oldalazás miatt
    pageCount: pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-4">
      {loading && <div className="mb-2">Betöltés...</div>}

      {/* Shadcn/ui Data Table komponens */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                Nincs adat.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Oldal navigáció */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Előző
        </button>
        <span>
          Oldal {pageIndex + 1} / {pageCount}
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
            setPageIndex(0); // visszaállítjuk az első oldalt
          }}
          className="ml-4 p-1 border rounded"
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

export default AdminJelentkezok;
