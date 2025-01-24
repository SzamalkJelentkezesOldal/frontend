import { Link } from "react-router-dom";
import logo from "../../assets/images/SZAMALK-logo-2020-Whitetransparent-XL.png";
import MenuIcon from "../icons/MenuIcon";
import { useState } from "react";
import NavItem from "./NavItem";
import useAuthContext from "../../context/AuthContext";
import LogInOut from "../icons/LogInOut";

function Navbar({ empty }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuthContext();

  return (
    <nav className="fixed flex flex-col top-0 left-0 w-full z-50  bg-szPrimary text-white  drop-shadow-lg">
      <div className="flex items-center justify-between px-8 py-6 lg:px-32 md:px-16  xl:px-50">
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
          <ul className="hidden sl:flex items-center gap-12 font-semibold text-base tracking-widest">
            <NavItem className="text-gray-50/90 hover:text-white hover:scale-105 p-2 px-5 rounded-2xl hover:bg-szPrimary-200/30 duration-100 transition-all" />
          </ul>
          {user ? (
            <button
              onClick={logout}
              className="hover:bg-szPrimary-200/30 hover:rounded-full p-2 px-3 flex gap-2 items-center"
            >
              <LogInOut isLoggedIn={true} />
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden hover:bg-szPrimary-200/30 hover:rounded-full p-2 px-3 md:flex gap-2 items-center"
              >
                <LogInOut isLoggedIn={false} />
                <span className="hidden md:inline-block">Belépés</span>
              </Link>
            </>
          )}

          {!user ? (
            <ul
              className={`hidden ${user ? "sl:flex" : ""} md:flex items-center gap-12 font-semibold text-base tracking-widest`}
            >
              <Link
                to="/"
                className="bg-gradient-to-r from-szSecondary-100/90 to-szSecondary-100 p-2 rounded-lg px-5 shadow-lg hover:bg-szSecondary-200/90 duration-200 transition-all"
              >
                Jelentkezés
              </Link>
            </ul>
          ) : (
            ""
          )}

          {!empty && (
            <button
              className={`${user ? (user?.role > 0 ? "sl:hidden" : "hidden") : "md:hidden"}`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <MenuIcon isOpen={isOpen} />
            </button>
          )}
        </div>
      </div>

      <div
        className={`md:hidden bg-szPrimary flex flex-col font-semibold text-lg transition-all duration-500  overflow-hidden ${
          isOpen
            ? "opacity-100 max-h-[500px] scale-y-100 pointer-events-auto visible"
            : "opacity-0 max-h-0 scale-y-0 pointer-events-none invisible"
        }`}
        style={{ transformOrigin: "top" }}
      >
        <NavItem
          className="py-4  px-8 md:px-16 hover:bg-szPrimary-200/40"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </nav>
  );
}

export default Navbar;
