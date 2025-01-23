import { Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

function NavItem({ className, onClick }) {
  const { user } = useAuthContext();
  return (
    <>
      {user ? (
        user?.role > 0 ? (
          user?.role > 1 ? (
            <>
              <Link
                to="/admin/ugyintezok"
                className={className}
                onClick={onClick}
              >
                Ügyintézők
              </Link>
              <Link
                to="/admin/jelentkezok"
                className={className}
                onClick={onClick}
              >
                Jelentkezők
              </Link>
              <Link
                to="/admin/statisztika"
                className={className}
                onClick={onClick}
              >
                Statisztika
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/admin/jelentkezok"
                className={className}
                onClick={onClick}
              >
                Jelentkezők
              </Link>
              <Link
                to="/admin/statisztika"
                className={className}
                onClick={onClick}
              >
                Statisztika
              </Link>
            </>
          )
        ) : (
          <></>
        )
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
