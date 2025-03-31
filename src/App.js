import { Route, Routes } from "react-router-dom";
import Beiratkozas from "./pages/Beiratkozas";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Belepes from "./pages/Belepes";
import Jelentkezes from "./pages/Jelentkezes";
import Regisztralas from "./pages/Regisztralas";
import AdminLayout from "./layouts/AdminLayout";
import MasterLayout from "./layouts/MasterLayout";
import AdminJelentkezok from "./pages/AdminJelentkezok";
import AdminUgyintezok from "./pages/AdminUgyintezok";
import AdminStatisztika from "./pages/AdminStatisztika";
import AdminNyilatkozat from "./components/admin/AdminNyilatkozat";
import AdminSzakok from "./pages/AdminSzakok";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GuestLayout />}>
        <Route index element={<Jelentkezes />} />
        <Route path="login" element={<Belepes />} />
        <Route path="register/:token" element={<Regisztralas />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="beiratkozas" element={<Beiratkozas />} />
        <Route element={<AdminLayout />}>
          <Route path="admin/jelentkezok" element={<AdminJelentkezok />} />
          <Route path="admin/statisztika" element={<AdminStatisztika />} />
          <Route path="admin/nyilatkozat" element={<AdminNyilatkozat />} />
          <Route path="admin/szakok" element={<AdminSzakok/>} />
          <Route element={<MasterLayout />}>
            <Route path="admin/ugyintezok" element={<AdminUgyintezok />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
