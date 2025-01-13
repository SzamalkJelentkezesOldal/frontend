import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "./MyAxios";
export const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await myAxios.get("/api/user");
      console.log("fh adatok: ", data);
      setUser(data);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("need to log in!");
      }
    }
  };

  const login = async ({ ...adat }) => {
    await csrf();
    try {
      await myAxios.post("/login", adat);
      await getUser();
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
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, register, user, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
