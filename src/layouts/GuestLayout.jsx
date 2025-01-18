import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";

function GuestLayout() {
  const { user } = useAuthContext();
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader "></div>
      </div>
    );
  }

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
