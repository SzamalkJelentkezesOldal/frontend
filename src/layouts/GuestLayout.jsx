import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";

function GuestLayout() {
  const { user } = useAuthContext();

  return !user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/beiratkozas" />
  );
}

export default GuestLayout;
