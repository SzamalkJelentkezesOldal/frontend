import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import Navbar from "../components/navbar/Navbar";

function AdminLayout() {
  const { user } = useAuthContext();
  const { isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" />;
  } else {
    return user && user.role > 0 ? (
      <>
        <Navbar />
        <Outlet />
      </>
    ) : (
      <Navigate to="/" />
    );
  }
}

export default AdminLayout;
