import useAuthContext from "../context/AuthContext";
import AdminLayout from "./AdminLayout";
import AuthLayout from "./AuthLayout";
import GuestLayout from "./GuestLayout";

function LayoutSelector() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    return <GuestLayout />;
  }

  if (user.role === 0) {
    return <AuthLayout />;
  }

  if (user.role > 0) {
    return <AdminLayout />;
  }

  return null; // Fallback, ha egyik feltétel sem teljesül
}

export default LayoutSelector;
