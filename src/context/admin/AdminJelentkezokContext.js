import React, { useState, useEffect, createContext } from "react";
import { myAxios } from "../MyAxios";
import CheckIcon from "../../components/icons/CheckIcon";
import MoreIcon from "../../components/icons/MoreIcon";
import RejectionIcon from "../../components/icons/RejectIcon";
import EditIcon from "../../components/icons/EditIcon";
import QuestionIcon from "../../components/icons/QuestionIcon";
import InProgressIcon from "../../components/icons/InProgressIcon";
import { mkConfig, generateCsv, download } from "export-to-csv";
import moment from "moment";

export const AdminJelentkezokContext = createContext("");

export const AdminJelentkezokProvider = ({ children }) => {
  const columns = [
    {
      accessorKey: "email",
      header: "Email",
      enableClickToCopy: true,
    },
    {
      accessorKey: "nev",
      header: "Név",
    },
    {
      accessorKey: "status",
      header: "Státusz",
      Cell: ({ cell }) => {
        const status = cell.getValue();
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
            className={`flex items-center gap-1 px-2 py-1 text-sm rounded-2xl w-max  ${statusClass}`}
          >
            {IconComponent && <IconComponent size={"16"} fill={fill} />}
            {status}
          </span>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("email");
  const [expanded, setExpanded] = useState({});
  const [exportMode, setExportMode] = useState("current"); // "current" vagy "all"
  const [applyFilters, setApplyFilters] = useState(false);

  function idoMegjelenites(ido) {
    const utcDate = ido;
    let localDate = "";
    if (ido) {
      localDate = moment(utcDate).local().format("YYYY-MM-DD HH:mm:ss");
    } else {
      localDate = "----.--.-- --:--:--";
    }

    return localDate;
  }

  const dokumentumLetolt = async (url, fileName) => {
    try {
      const response = await myAxios.get(url, {
        responseType: "blob",
        withCredentials: true,
      });
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Hiba a fájl letöltésekor:", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await myAxios.get("/api/jelentkezok", {
        params: {
          page: pagination.pageIndex + 1,
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

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => {
      const { email, nev, status } = row.original;
      return { email, nev, status };
    });
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportAllRows = async () => {
    try {
      const response = await myAxios.get("/api/jelentkezok", {
        params: {
          page: 1,
          limit: totalCount,
          filter: selectedFilter,
          search: searchQuery,
          searchField: searchField,
        },
      });
      const { results } = response.data;
      const rowData = results.map((row) => {
        const { email, nev, status } = row;
        return { email, nev, status };
      });
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);
    } catch (error) {
      console.error("Hiba az összes sor exportálásakor:", error);
    }
  };

  const handleExportData = async () => {
    try {
      const response = await myAxios.get("/api/jelentkezok", {
        params: {
          page: 1,
          limit: totalCount,
          filter: 1,
          search: "",
          searchField: "email",
        },
      });
      const { results } = response.data;
      const exportData = results.map((row) => ({
        nev: row.nev,
        email: row.email,
        status: row.status,
      }));
      const csv = generateCsv(csvConfig)(exportData);
      download(csvConfig)(csv);
    } catch (error) {
      console.error("Hiba az összes adat exportálásakor:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    selectedFilter,
    searchQuery,
    searchField,
  ]);

  useEffect(() => {
    setExpanded({});
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [selectedFilter, searchQuery, searchField]);

  const localization = {
    actions: "Műveletek",
    and: "és",
    cancel: "Mégse",
    changeFilterMode: "Szűrés módjának megváltoztatása",
    changeSearchMode: "Keresési mód megváltoztatása",
    clearFilter: "Szűrő törlése",
    clearSearch: "Keresés törlése",
    clearSort: "Rendezés törlése",
    clickToCopy: "Kattints a másoláshoz",
    collapse: "Összecsukás",
    collapseAll: "Minden elem összecsukása",
    columnActions: "Oszlopműveletek",
    copiedToClipboard: "Vágólapra másolva",

    dropToGroupBy: "Húzd ide a csoportosításhoz {column}",
    edit: "Szerkesztés",
    expand: "Kibontás",
    expandAll: "Minden elem kibontása",
    filterArrIncludes: "Tartalmaz",
    filterArrIncludesAll: "Mindent tartalmaz",
    filterArrIncludesSome: "Tartalmaz",
    filterBetween: "Között",
    filterBetweenInclusive: "Közötti (inkluzív)",
    filterByColumn: "Szűrés a(z) {column} alapján",
    filterContains: "Tartalmaz",
    filterEmpty: "Üres",
    filterEndsWith: "Zárul vele",
    filterEquals: "Egyenlő",
    filterEqualsString: "Egyenlő",
    filterFuzzy: "Körülbelüli",
    filterGreaterThan: "Nagyobb mint",
    filterGreaterThanOrEqualTo: "Nagyobb vagy egyenlő mint",
    filterInNumberRange: "Között",
    filterIncludesString: "Tartalmaz",
    filterIncludesStringSensitive: "Tartalmaz (érzékeny)",
    filterLessThan: "Kisebb mint",
    filterLessThanOrEqualTo: "Kisebb vagy egyenlő mint",
    filterMode: "Szűrés módja: {filterType}",
    filterNotEmpty: "Nem üres",
    filterNotEquals: "Nem egyenlő",
    filterStartsWith: "Ezzel kezdődik",
    filterWeakEquals: "Egyenlő",
    filteringByColumn:
      "Szűrés a(z) {column} alapján – {filterType} {filterValue}",
    goToFirstPage: "Ugrás az első oldalra",
    goToLastPage: "Ugrás az utolsó oldalra",
    goToNextPage: "Ugrás a következő oldalra",
    goToPreviousPage: "Ugrás az előző oldalra",
    grab: "Fogd meg",
    groupByColumn: "Csoportosítás a(z) {column} alapján",
    groupedBy: "Csoportosítva: ",
    hideAll: "Összes elrejtése",
    hideColumn: "A(z) {column} oszlop elrejtése",
    max: "Maximum",
    min: "Minimum",
    move: "Mozgatás",
    noRecordsToDisplay: "Nincs megjelenítendő rekord",
    noResultsFound: "Nincs találat",
    of: "/",
    or: "vagy",
    pinToLeft: "Rögzítés balra",
    pinToRight: "Rögzítés jobbra",
    resetColumnSize: "Oszlopméret visszaállítása",
    resetOrder: "Sorrend visszaállítása",
    rowActions: "Sorműveletek",
    rowNumber: "#",
    rowNumbers: "Sorszámok",
    rowsPerPage: "Sorok száma oldalanként",
    save: "Mentés",
    search: "Keresés az oldalon...",
    selectedCountOfRowCountRowsSelected:
      "{selectedCount} a {rowCount} sorból kiválasztva",
    select: "Kiválaszt",
    showAll: "Összes megjelenítése",
    showAllColumns: "Összes oszlop megjelenítése",
    showHideColumns: "Oszlopok megjelenítése/elrejtése",
    showHideFilters: "Szűrők megjelenítése/elrejtése",
    showHideSearch: "Keresés megjelenítése/elrejtése",
    sortByColumnAsc: "Rendezés a(z) {column} szerint növekvő sorrendben",
    sortByColumnDesc: "Rendezés a(z) {column} szerint csökkenő sorrendben",
    sortedByColumnAsc: "Rendezve a(z) {column} szerint növekvő sorrendben",
    sortedByColumnDesc: "Rendezve a(z) {column} szerint csökkenő sorrendben",
    thenBy: ", majd",
    toggleDensity: "Sűrűség váltása",
    toggleFullScreen: "Teljes képernyő mód váltása",
    toggleSelectAll: "Összes kiválasztás kapcsolása",
    toggleSelectRow: "Sor kiválasztásának váltása",
    toggleVisibility: "Láthatóság váltása",
    ungroupByColumn: "Csoportosítás feloldása a(z) {column} alapján",
    unpin: "Rögzítés feloldása",
    unpinAll: "Minden rögzítés feloldása",
  };

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
        localization,
        handleExportData,
        handleExportRows,
        handleExportAllRows,
        exportMode,
        setExportMode,
        applyFilters,
        setApplyFilters,
        idoMegjelenites,
        dokumentumLetolt,
      }}
    >
      {children}
    </AdminJelentkezokContext.Provider>
  );
};
