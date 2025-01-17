import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

function NavItem({ className, onClick }) {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        <></>
      ) : (
        <>
          <Link to="/" className={className} onClick={onClick}>
            Jelentkezés
          </Link>
        </>
      )}
    </>
  );
}

export default NavItem;
