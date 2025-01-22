import { Route, Routes } from "react-router-dom";
import Beiratkozas from "./pages/Beiratkozas";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Belepes from "./pages/Belepes";
import Jelentkezes from "./pages/Jelentkezes";
import Regisztralas from "./pages/Regisztralas";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <Routes>
      <Route path="/hiba" element={<NoPage />} />
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Jelentkezes />} />
        <Route path="login" element={<Belepes />} />
        <Route path="register/:token" element={<Regisztralas />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="beiratkozas" element={<Beiratkozas />} />
        <Route element={<AdminLayout />}>
          <Route path="admin/kezdolap" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
