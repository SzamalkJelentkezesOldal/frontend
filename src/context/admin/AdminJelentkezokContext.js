import React, { useState, useEffect, createContext } from "react";
import { myAxios } from "../MyAxios";

export const AdminJelentkezokContext = createContext("");

export const AdminJelentkezokProvider = ({ children }) => {
  const columns = [
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "nev",
      header: "Név",
    },
    {
      accessorKey: "status",
      header: "Státusz",
      cell: (info) => info.getValue(),
    },
  ];

  // Állapotok
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("email");
  const [expanded, setExpanded] = useState({});

  // API hívás a backendről
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await myAxios.get("/api/jelentkezok", {
        params: {
          page: pagination.pageIndex + 1, // az API 1-indexelt oldalt vár
          limit: pagination.pageSize,
          filter: selectedFilter,
          search: searchQuery,
          searchField: searchField,
        },
      });
      const { results, totalCount } = response.data;
      setData(results);
      setTotalCount(totalCount);
      console.log("Adatok lekérve:", response);
    } catch (error) {
      console.error("Hiba az adatok lekérésekor:", error);
    }
    setLoading(false);
  };

  // Lekérjük az adatokat, ha bármelyik releváns paraméter változik
  useEffect(() => {
    fetchData();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    selectedFilter,
    searchQuery,
    searchField,
  ]);

  // Ha a filter vagy a keresés változik, zárjuk be az expanded row-okat és reseteljük az oldalszámot.
  useEffect(() => {
    setExpanded({});
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [selectedFilter, searchQuery, searchField]);

  return (
    <AdminJelentkezokContext.Provider
      value={{
        columns,
        data,
        loading,
        totalCount,
        setSelectedFilter,
        setSearchQuery,
        setSearchField,
        expanded,
        setExpanded,
        pagination,
        setPagination,
      }}
    >
      {children}
    </AdminJelentkezokContext.Provider>
  );
};
