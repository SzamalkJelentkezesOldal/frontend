import { Navigate } from "react-router-dom";
import useAuthContext from "../context/AuthContext";

function ProtectedRoute({ children, requiredRole }) {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (user.role < requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
