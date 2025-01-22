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
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const getUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await myAxios.get("/api/user");
      setIsAdmin(data.role > 0);
      setUser(data);
      return data;
    } catch (error) {
      console.error("No authenticated user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async ({ ...adat }) => {
    await csrf();
    try {
      await myAxios.post("/login", adat);
      const data = await getUser();
      console.log(data);
      console.log(isAdmin);
      if (data.role > 0) {
        navigate("/admin/kezdolap");
      } else {
        navigate("/beiratkozas");
      }
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
    if (!user) {
      getUser(); // Biztosítja, hogy a felhasználói adatok minél hamarabb betöltődjenek
    }
  }, [user, getUser]);

  useEffect(() => {
    if (user && user?.role > 0) {
      navigate("/admin/kezdolap");
    } else if (user) {
      navigate("/beiratkozas");
    }
  }, [user, navigate]);

  return (
    <AuthContext.Provider
      value={{ login, register, user, getUser, logout, isLoading, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
