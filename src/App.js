import { Route, Routes } from "react-router-dom";
import Beiratkozas from "./pages/Beiratkozas";
import AuthLayout from "./layouts/AuthLayout";
import GuestLayout from "./layouts/GuestLayout";
import Belepes from "./pages/Belepes";
import Jelentkezes from "./pages/Jelentkezes";
import Regisztralas from "./pages/Regisztralas";

function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="beiratkozas" element={<Beiratkozas />} />
      </Route>
      <Route element={<GuestLayout />}>
        <Route path="jelentkezes" element={<Jelentkezes />} />
        <Route path="/" element={<Jelentkezes />} />
        <Route path="login" element={<Belepes />} />
        <Route path="register/:token" element={<Regisztralas />} />
      </Route>
    </Routes>
  );
}

export default App;
