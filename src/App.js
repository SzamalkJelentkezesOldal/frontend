import { Route, Router, Routes } from "react-router-dom";
import Beiratkozas from "./pages/Beiratkozas";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Belepes from "./pages/Belepes";
import Jelentkezes from "./pages/Jelentkezes";
import Regisztralas from "./pages/Regisztralas";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";
import LayoutSelector from "./layouts/LayoutSelector";
import ProtectedRoute from "./layouts/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutSelector />}>
        <Route path="login" element={<Belepes />} />
        <Route index element={<Jelentkezes />} />
        <Route
          path="beiratkozas"
          element={
            // <ProtectedRoute requiredRole={0}>
            <Beiratkozas />
            // </ProtectedRoute>
          }
        />
        <Route
          path="admin"
          element={
            // <ProtectedRoute requiredRole={1}>
            <Admin />
            // </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
