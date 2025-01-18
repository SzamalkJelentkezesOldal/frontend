import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";

function AuthLayout() {
  const { user } = useAuthContext();
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return user ? (
    <>
      <Navbar empty={true} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default AuthLayout;
