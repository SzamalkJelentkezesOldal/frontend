import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";

function AdminLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default AdminLayout;
