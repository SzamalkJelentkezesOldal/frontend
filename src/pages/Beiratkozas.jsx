import useAuthContext from "../context/AuthContext";

function Beiratkozas() {
  const { user } = useAuthContext();
  return <>Üdv, {user?.name}</>;
}

export default Beiratkozas;
