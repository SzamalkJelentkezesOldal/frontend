import { Link } from "react-router-dom";
import logo from "../../assets/images/SZAMALK-logo-2020-Whitetransparent-XL.png";
import MenuIcon from "../icons/MenuIcon";
import { useState } from "react";
import NavItem from "./NavItem";
import useAuthContext from "../../context/AuthContext";
import LogInOut from "../icons/LogInOut";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuthContext();

  return (
    <nav className="flex fixed top-0 left-0 w-full z-50 justify-between items-center bg-szPrimary text-white py-6 px-8 md:px-16 lg:px-32 xl:px-50 drop-shadow-lg">
      <a
        href="https://www.szamalk-szalezi.hu/"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={logo}
          alt="logo"
          className="w-52 hover:scale-105 transition-all"
        />
      </a>

      <div className="flex items-center gap-8">
        {user ? (
          <button
            onClick={logout}
            className="hover:bg-szPrimary-200/40 hover:rounded-full p-2 px-3 flex gap-2 items-center"
          >
            <LogInOut isLoggedIn={true} />
            Kilépés
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:bg-szPrimary-200/40 hover:rounded-full p-2 px-3 flex gap-2 items-center"
            >
              <LogInOut isLoggedIn={false} />
              Belépés
            </Link>
          </>
        )}

        <ul className="hidden lg:flex items-center gap-12 font-semibold text-base tracking-widest">
          <NavItem className="bg-gradient-to-r from-szSecondary-100/90 to-szSecondary-100 p-2 rounded-lg px-5 shadow-lg hover:bg-szSecondary-200/90 duration-200 transition-all" />
        </ul>

        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon isOpen={isOpen} />
        </button>
      </div>
      <div
        className={`absolute lg:hidden top-20 left-0 w-full bg-szPrimary flex flex-col font-semibold text-lg transform transition-transform ${isOpen ? "opacity-100" : "opacity-0"}`}
        style={{ transition: "opacity 0.4s ease, opacity 0.4s ease" }}
      >
        <NavItem className="py-4 px-8 md:px-16 hover:bg-szPrimary-200/40" />
      </div>
    </nav>
  );
}

export default Navbar;
