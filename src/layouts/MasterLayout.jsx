import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import useAuthContext from "../context/AuthContext";

function MasterLayout() {
  const { isMaster, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return isMaster ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/admin/jelentkezok" />
  );
}

export default MasterLayout;
