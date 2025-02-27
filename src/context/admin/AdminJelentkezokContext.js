import React, { useState, useEffect } from "react";
import { myAxios } from "../MyAxios";
import CheckIcon from "../../components/icons/CheckIcon";
import MoreIcon from "../../components/icons/MoreIcon";
import RejectionIcon from "../../components/icons/RejectIcon";
import EditIcon from "../../components/icons/EditIcon";
import QuestionIcon from "../../components/icons/QuestionIcon";
import InProgressIcon from "../../components/icons/InProgressIcon";

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
      accessorKey: "expand",
      header: "",
      cell: (info) => (
        <div className="flex items-center">
          <button
            onClick={() => info.row.toggleExpanded()}
            className="px-2 py-1 bg-inputGray-50 text-dark shadow-md rounded text-sm font-semibold"
          >
            {info.row.getIsExpanded() ? "-" : "+"}
          </button>
          <span>{info.getValue()}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "nev",
      header: "Név",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Státusz",
      cell: (info) => {
        const status = info.getValue();
        let statusClass = "";
        let IconComponent = null;
        let fill = "";

        if (status === "Elfogadva") {
          statusClass = "border-[1px] border-green-600 text-green-600";
          IconComponent = CheckIcon;
          fill = "#43a047";
        } else if (status === "Jelentkezett") {
          statusClass = "border-[1px] border-yellow-700 text-yellow-700";
          IconComponent = MoreIcon;
          fill = "#fbc02d";
        } else if (status === "Elutasítva") {
          statusClass = "border-[1px] border-red-700 text-red-700";
          IconComponent = RejectionIcon;
          fill = "#d32f2f";
        } else if (status === "Módosításra vár") {
          statusClass = "border-[1px] border-orange-800 text-orange-800";
          IconComponent = EditIcon;
          fill = "#ef6c00";
        } else if (status === "Eldöntésre vár") {
          statusClass = "border-[1px] border-blue-800 text-blue-800";
          IconComponent = QuestionIcon;
          fill = "#1565c0";
        } else {
          statusClass =
            "border-[1px] border-light-blue-300 text-light-blue-300";
          IconComponent = InProgressIcon;
          fill = "#4fc3f7";
        }
        return (
          <span
            className={`flex items-center gap-1 px-2 py-1 text-sm rounded-2xl w-max text-red text-gree ${statusClass}`}
          >
            {IconComponent && <IconComponent size={"16"} fill={fill} />}
            {status}
          </span>
        );
      },
    },
  ];

  // Állapotok: adat, oldal index, oldal méret, összes oldal száma, és az expandid állapotok
  const [data, setData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0); // 0-indexelt
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState({}); // Expanzió állapot
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("email");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await myAxios.get("/api/jelentkezok", {
        params: {
          page: pageIndex + 1, // az API 1-indexelt oldalt vár
          limit: pageSize,
          filter: selectedFilter,
          search: searchQuery, //keresett szöveg
          searchField: searchField, // keresett mező
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

  useEffect(() => {
    fetchData();
    setExpanded({});
  }, [pageIndex, pageSize, selectedFilter, searchQuery, searchField]);

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

  function jelentkezokSzurese(szuro) {
    setSelectedFilter(szuro);
    setPageIndex(0);
  }

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
        jelentkezokSzurese,
        setSearchQuery,
        setSearchField,
      }}
    >
      {children}
    </AdminJelentkezokContext.Provider>
  );
};
