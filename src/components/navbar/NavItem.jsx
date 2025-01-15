import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

function NavItem({ className }) {
  const { logout, user } = useAuthContext();
  return (
    <>
      {user ? (
        <></>
      ) : (
        <>
          <Link to="/" className={className}>
            Jelentkezés
          </Link>
        </>
      )}
    </>
  );
}

export default NavItem;
