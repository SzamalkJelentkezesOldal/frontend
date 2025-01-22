import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import useAuthContext from "../context/AuthContext";

function AdminLayout() {
  const { isAdmin, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return isAdmin ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/beiratkozas" />
  );
}

export default AdminLayout;
