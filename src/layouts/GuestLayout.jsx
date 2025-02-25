import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import useAuthContext from "../context/AuthContext";

function GuestLayout() {
  const { user, isLoading, isAdmin } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (user && !isLoading) {
    if (isAdmin) {
      return <Navigate to="/admin/jelentkezok" />;
    }
    return <Navigate to="/beiratkozas" />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default GuestLayout;
