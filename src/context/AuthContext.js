import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { myAxios } from "./MyAxios";
import { useNavigate } from "react-router-dom";
import { SorrendContext } from "./beiratkozas/SorrendContext";
import { BeiratkozasContext } from "./beiratkozas/BeiratkozasContext";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  const { setJelentkezesek, setSorrendLoading } = useContext(SorrendContext);
  const { setStepperActive, setAllapotLoading } =
    useContext(BeiratkozasContext);
  const [user, setUser] = useState(null);
  const [jelentkezoID, setJelentkezoID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaster, setIsMaster] = useState(false);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await myAxios.get("/api/user");
      setIsAdmin(data.role > 0);
      setIsMaster(data.role > 1);
      setUser(data);
      return data;
    } catch (error) {
      console.warn("Nem vagy belépve:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setUser]);

  const login = async ({ ...adat }) => {
    await csrf();
    try {
      await myAxios.post("/login", adat);
      const data = await getUser();
      console.log(data);
      if (data?.role > 0) {
        console.log(isAdmin);
        navigate("/admin/jelentkezok");
      } else if (data) {
        navigate("/beiratkozas");
      }
      console.log(data);
    } catch (e) {
      console.log(e.response.data.errors);
    }
  };

  const register = async ({ ...adat }, token) => {
    await csrf();
    console.log("register token", token);

    try {
      await myAxios.post(`/register/${token}`, adat);
      await getUser();
    } catch (e) {
      console.log(adat);
      console.log(e.response.data.errors);
    }
  };

  const logout = () => {
    myAxios.post("/logout").then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    const initializeUser = async () => {
      const data = await getUser();
      if (data?.role > 0) {
        navigate("/admin/jelentkezok");
      } else if (data) {
        navigate("/beiratkozas");
        try {
          setAllapotLoading(true);
          const jelentkezesAllapot = await myAxios.get(
            `/api/jelentkezes-allapot/${data.email}`
          );
          setJelentkezoID(jelentkezesAllapot.data.jelentkezo_id);

          if (jelentkezesAllapot.data.elnevezes === "Regisztrált") {
            setStepperActive(0);
          } else if (
            jelentkezesAllapot.data.elnevezes === "Törzsadatok feltöltve"
          ) {
            setStepperActive(1);
          } else if (
            jelentkezesAllapot.data.elnevezes === "Dokumentumok feltöltve"
          ) {
            setStepperActive(2);
          } else if (
            jelentkezesAllapot.data.elnevezes === "Eldöntésre vár" ||
            jelentkezesAllapot.data.elnevezes === "Módósításra vár"
          ) {
            setStepperActive(3);
          }
        } catch (e) {
          console.log("állapot lekérés hiba", e);
        } finally {
          setAllapotLoading(false);
        }

        try {
          setSorrendLoading(true);
          const jelentkezesLista = await myAxios.get(
            `/api/jelentkezesek/${data.email}`
          );
          setJelentkezesek(jelentkezesLista.data);
        } catch (e) {
          console.log("Hiba jelentkezések lekérése kor.", e);
        } finally {
          setSorrendLoading(false);
        }
      }
      console.log(data);
    };

    if (!user) {
      initializeUser();
    }
  }, [user, getUser, navigate]);

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        user,
        getUser,
        logout,
        isLoading,
        isAdmin,
        isMaster,
        jelentkezoID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
