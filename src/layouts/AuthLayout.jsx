import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import useAuthContext from "../context/AuthContext";

function AuthLayout() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default AuthLayout;
