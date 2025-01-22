import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import useAuthContext from "../context/AuthContext";

function GuestLayout() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return user && !isLoading ? (
    <Navigate to="/beiratkozas" />
  ) : (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default GuestLayout;
