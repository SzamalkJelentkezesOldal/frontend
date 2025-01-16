import BeiratkozasMain from "../components/BeiratkozasMain";
import useAuthContext from "../context/AuthContext";

function Beiratkozas() {
  const { user } = useAuthContext();
  return (
    <div>
      <BeiratkozasMain />
    </div>
  );
}

export default Beiratkozas;
