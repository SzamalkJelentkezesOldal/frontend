import { createContext, useEffect, useState } from "react";
import { myAxios } from "../MyAxios";

export const AdminSzakStatisztikaContext = createContext("");

export const AdminSzakStatisztikaProvider = ({ children }) => {
  const [nappaliEsti, setNappaliEsti] = useState({ nappali: 0, esti: 0 });
  const [jelentkezokSzamaSzakokra, setJelentkezokSzamaSzakokra] = useState([]);
  const [jelentkezokSzamaTagozatraSzakokra, setJelentkezokSzamaTagozatraSzakokra] = useState([]);
  const [statisztikaOldal, setStatisztikaOldal] = useState("Szakokra");


  const exportToCSV = (data, fileName = "export.csv", headerMap = null) => {
    if (!data || !data.length) return;
  
    const headers = Object.keys(data[0]);
    const csvHeaders = headerMap ? headers.map(h => headerMap[h] || h) : headers;
  
    const csvRows = [
      csvHeaders.join(";"),
      ...data.map(row =>
        headers.map(header => `"${row[header]}"`).join(";")
      )
    ];
  
    const csvContent = "\uFEFF" + csvRows.join("\n"); // <- UTF-8 BOM hozzáadva!
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  function oldalValtas() {
    if (statisztikaOldal==="Szakokra") {
      setStatisztikaOldal("Jelentkezőkre")
    }else{
      setStatisztikaOldal("Szakokra")
    }
  }
  useEffect(() => {
    const tagozatonkentiJelentkezes = async () => {
      try {
        const response = await myAxios.get("/api/jelentkezok-tagozatra-bontva");
        setNappaliEsti(response.data[0]);
      } catch (err) {
        console.log("Hiba történt az adatok lekérésekor.", err);
      }
    };
    const jelentkezesekSzamaSzakokra = async () => {
      try {
        const response = await myAxios.get("/api/jelentkezok-szama-statisztika");
        setJelentkezokSzamaSzakokra(response.data);
      } catch (err) {
        console.log("Hiba történt az adatok lekérésekor.", err);
      }
    };
    const jelentkezesekSzamaTagozatraSzakokra = async () => {
      try {
        const response = await myAxios.get("/api/jelentkezok-tagozatra-szakra-bontva");
        setJelentkezokSzamaTagozatraSzakokra(response.data);
      } catch (err) {
        console.log("Hiba történt az adatok lekérésekor.", err);
      }
    };

    tagozatonkentiJelentkezes();
    jelentkezesekSzamaSzakokra();
    jelentkezesekSzamaTagozatraSzakokra();
  }, []);
  return (
    <AdminSzakStatisztikaContext.Provider
      value={{ nappaliEsti, jelentkezokSzamaSzakokra, jelentkezokSzamaTagozatraSzakokra, statisztikaOldal, oldalValtas, exportToCSV } }
    >
      {children}
    </AdminSzakStatisztikaContext.Provider>
  );
};
