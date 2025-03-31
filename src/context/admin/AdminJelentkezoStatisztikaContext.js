import { createContext, useEffect, useState } from "react";
import { myAxios } from "../MyAxios";

export const AdminJelentkezoStatisztikaContext = createContext("");

export const AdminJelentkezoStatisztikaProvider = ({ children }) => {

    const [elfogadottakSzama, setElfogadottakSzama] = useState({ osszesen: 0, elfogadottak: 0 });
    const [elfogadottakSzamaSzakonkent, setElfogadottakSzamaSzakonkent] = useState([]);
    const [haviRegisztraciokSzama, setHaviRegisztraciokSzama] = useState([]);
    const [haviRegisztraciokSzakonkentSzama, setHaviRegisztraciokSzakonkentSzama] = useState([]);


  
  useEffect(() => {
    const elfogadottJelentkezesek= async () => {
        try {
          const response = await myAxios.get("/api/jelentkezok-osszesen-elfogadva");
          console.log(response);
          console.log(response.data);
          setElfogadottakSzama(response.data);
        } catch (err) {
          console.log("Hiba történt az adatok lekérésekor.", err);
        }
      };

      const elfogadottJelentkezesekSzakonkent= async () => {
        try {
          const response = await myAxios.get("/api/jelentkezok-szakonkent-elfogadva");
          setElfogadottakSzamaSzakonkent(response.data);
        } catch (err) {
          console.log("Hiba történt az adatok lekérésekor.", err);
        }
      };
      
      const haviRegisztracio = async () => {
        try {
          const response = await myAxios.get("/api/jelentkezok-havi-regisztracio");
          setHaviRegisztraciokSzama(response.data);
        } catch (err) {
          console.log("Hiba történt az adatok lekérésekor.", err);
        }
      };
            


        elfogadottJelentkezesek();
        elfogadottJelentkezesekSzakonkent();
        haviRegisztracio();
        haviRegisztracioSzakonkent(0);
  }, []);
  const haviRegisztracioSzakonkent = async (szak) => {
    try {
      const response = await myAxios.get("/api/jelentkezok-havi-regisztracio/"+szak);
      setHaviRegisztraciokSzakonkentSzama(response.data);
    } catch (err) {
      console.log("Hiba történt az adatok lekérésekor.", err);
    }
  };
  return (
    <AdminJelentkezoStatisztikaContext.Provider
      value={{elfogadottakSzama, elfogadottakSzamaSzakonkent, haviRegisztraciokSzama, haviRegisztraciokSzakonkentSzama}}
    >
      {children}
    </AdminJelentkezoStatisztikaContext.Provider>
  );
};
