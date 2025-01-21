import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default GuestLayout;
