import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";
import { useNavigate } from "react-router-dom";
export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const { data } = await myAxios.get("/api/user");
      console.log("fh adatok: ", data);
      if (JSON.stringify(data) !== JSON.stringify(user)) {
        setUser(data);
      }
    } catch (e) {
      if (e.response.status === 401) {
        console.log("nincs belépve!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ ...adat }) => {
    await csrf();
    try {
      await myAxios.post("/login", adat);
      await getUser();
      navigate("/beiratkozas");
      // if (user.role === 0) {
      //   navigate("/beiratkozas");
      // } else {
      //   navigate("/admin");
      // }
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

  return (
    <AuthContext.Provider
      value={{ login, register, user, getUser, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
