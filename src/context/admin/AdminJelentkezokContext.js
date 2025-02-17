import React, { useState, useEffect } from "react";
import { myAxios } from "../MyAxios";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
} from "@tanstack/react-table";

import { createContext } from "react";

export const AdminJelentkezokContext = createContext("");

export const AdminJelentkezokProvider = ({ children }) => {
  const columns = [
    {
      accessorKey: "email",
      header: "Email",
      cell: (info) => (
        <div className="flex items-center">
          <button
            onClick={() => info.row.toggleExpanded()}
            className="mr-2 px-2 py-1 bg-gray-200 rounded text-sm"
          >
            {info.row.getIsExpanded() ? "-" : "+"}
          </button>
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "nev",
      header: "Név",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Státusz",
      cell: (info) => info.getValue(),
    },
  ];

  // Állapotok: adat, oldal index, oldal méret, összes oldal száma, és az expandid állapotok
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0); // 0-indexelt
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({}); // Expanzió állapot

  // Adatlekérés axios-szal, a Laravel backend API-jából.
  // Tegyük fel, hogy az API a következő formátumban adja vissza az adatokat:
  // { results: [...], totalCount: number }
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await myAxios.get("/api/jelentkezok", {
        params: {
          page: pageIndex + 1, // az API 1-indexelt oldalt vár
          limit: pageSize,
        },
      });
      const { results, totalCount } = response.data;
      setData(results);
      setPageCount(Math.ceil(totalCount / pageSize));
      console.log("Adatok lekérve:", response);
    } catch (error) {
      console.error("Hiba az adatok lekérésekor:", error);
    }
    setLoading(false);
  };

  // Újra lekérjük az adatokat, amikor az oldal vagy az oldal méret változik
  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize]);

  // TanStack Table inicializálása, beleértve a manuális paginationt és a row expanziót
  const table = useReactTable({
    data,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    manualPagination: true,
    pageCount: pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <AdminJelentkezokContext.Provider
      value={{
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
      }}
    >
      {children}
    </AdminJelentkezokContext.Provider>
  );
};
