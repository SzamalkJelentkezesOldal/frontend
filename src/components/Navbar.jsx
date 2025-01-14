import { Link } from "react-router-dom";
import logo from "../assets/images/SZAMALK-logo-2020-Whitetransparent-XL.png";
import useAuthContext from "../context/AuthContext";

function Navbar() {
  const { logout, user } = useAuthContext();

  return (
    <nav className="bg-szPrimary border-gray-200 ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <a
          href="https://www.szamalk-szalezi.hu"
          target="_blank"
          rel="noreferrer"
        >
          <img src={logo} alt="SZÁMALK logo" className="h-12" />
        </a>
        <div className="flex items-center">
          {user ? (
            <button
              onClick={logout}
              className="text-gray-200 p-4 border-b-2 border-gray-100 border-opacity-0 hover:border-opacity-100 hover:text-gray-100 duration-200"
            >
              Kijelentkezés
            </button>
          ) : (
            <>
              <Link
                to="/"
                className="text-gray-200 p-4 border-b-2 border-gray-100 border-opacity-0 hover:border-opacity-100 hover:text-gray-100 duration-200"
              >
                Jelentkezés
              </Link>
              <Link
                to="/login"
                className="text-gray-200 p-4 border-b-2 border-gray-100 border-opacity-0 hover:border-opacity-100 hover:text-gray-100 duration-200"
              >
                Belépés
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
