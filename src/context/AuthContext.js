import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { myAxios } from "./MyAxios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const [user, setUser] = useState(null);
  const [jelentkezoID, setJelentkezoID] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMaster, setIsMaster] = useState(false);
  const [modositasLoading, setModositasLoading] = useState(false);

  const [stepperActive, setStepperActive] = useState(0);
  const [allapotLoading, setAllapotLoading] = useState(false);
  const [modositasraVar, setModositasraVar] = useState(false);
  const [jelentkezoEmail, setJelentkezoEmail] = useState("");

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await myAxios.get("/api/user");
      setIsAdmin(data.role > 0);
      setIsMaster(data.role > 1);
      setUser(data);
      if (data && data.email) {
        setJelentkezoEmail(data.email);
      }
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
      return true;
    } catch (e) {
      return false;
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

  const modositasVegrehajtas = async () => {
    const emailToUse = jelentkezoEmail || (user ? user.email : "");
    console.log("AuthContext - emailToUse:", emailToUse);

    setModositasLoading(true);
    try {
      await myAxios.patch(`/api/modositas-vegrehajtas/${emailToUse}`);
      setModositasraVar(false);
      return true;
    } catch (e) {
      console.log("Módosítás sikertelen", e);
      return false;
    } finally {
      setModositasLoading(false);
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      const data = await getUser();
      if (data?.role > 0) {
        // navigate("/admin/jelentkezok");
      } else if (data) {
        navigate("/beiratkozas");

        try {
          setAllapotLoading(true);
          const jelentkezesAllapot = await myAxios.get(
            `/api/jelentkezes-allapot/${data.email}`
          );
          setJelentkezoID(jelentkezesAllapot?.data?.jelentkezo_id);

          if (jelentkezesAllapot?.data?.elnevezes === "Regisztrált") {
            setStepperActive(0);
          } else if (
            jelentkezesAllapot?.data?.elnevezes === "Törzsadatok feltöltve"
          ) {
            setStepperActive(1);
          } else if (
            jelentkezesAllapot?.data?.elnevezes === "Dokumentumok feltöltve"
          ) {
            setStepperActive(2);
          } else if (
            jelentkezesAllapot?.data?.elnevezes === "Eldöntésre vár" ||
            jelentkezesAllapot?.data?.elnevezes === "Módosításra vár" ||
            jelentkezesAllapot?.data?.elnevezes === "Elutasítva" ||
            jelentkezesAllapot?.data?.elnevezes === "Elfogadva"
          ) {
            setStepperActive(3);
            if (jelentkezesAllapot?.data?.elnevezes === "Módosításra vár") {
              setModositasraVar(true);
              setJelentkezoEmail(jelentkezesAllapot?.data?.email);
            }
          }
        } catch (e) {
          console.log("állapot lekérés hiba", e);
        } finally {
          setAllapotLoading(false);
        }

        if (data) {
          try {
            const jelentkezesLista = await myAxios.get(
              `/api/jelentkezesek/${data.email}`
            );
            // Do something with jelentkezesLista if needed for future functionality
          } catch (e) {
            console.log("Hiba jelentkezések lekérése kor.", e);
          }
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
        csrf,
        // Beiratkozas-related values
        stepperActive,
        setStepperActive,
        allapotLoading,
        setAllapotLoading,
        modositasraVar,
        setModositasraVar,
        jelentkezoEmail,
        setJelentkezoEmail,
        modositasVegrehajtas,
        modositasLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
