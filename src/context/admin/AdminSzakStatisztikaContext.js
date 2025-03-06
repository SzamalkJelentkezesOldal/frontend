import { createContext, useEffect, useState } from "react";
import { myAxios } from "../MyAxios";

export const AdminSzakStatisztikaContext = createContext("");

export const AdminSzakStatisztikaProvider = ({ children }) => {
  const [nappaliEsti, setNappaliEsti] = useState({ nappali: 0, esti: 0 });
  const [jelentkezokSzamaSzakokra, setJelentkezokSzamaSzakokra] = useState([]);
  const [jelentkezokSzamaTagozatraSzakokra, setJelentkezokSzamaTagozatraSzakokra] = useState([]);
  const [statisztikaOldal, setStatisztikaOldal] = useState("Szakokra");


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
  function oldalValtas() {
    if (statisztikaOldal==="Szakokra") {
      setStatisztikaOldal("Jelentkezőkre")
    }else{
      setStatisztikaOldal("Szakokra")
    }
  }
  useEffect(() => {
    tagozatonkentiJelentkezes();
    jelentkezesekSzamaSzakokra();
    jelentkezesekSzamaTagozatraSzakokra();
  }, []);
  return (
    <AdminSzakStatisztikaContext.Provider
      value={{ nappaliEsti, jelentkezokSzamaSzakokra, jelentkezokSzamaTagozatraSzakokra, statisztikaOldal, oldalValtas }}
    >
      {children}
    </AdminSzakStatisztikaContext.Provider>
  );
};
