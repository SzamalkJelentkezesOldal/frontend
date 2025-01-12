import Jelentkezes from "./components/Jelentkezes";
import { JelentkezesProvider } from "./context/JelentkezesContext";

function App() {
  return (
    <>
      <JelentkezesProvider>
        <Jelentkezes />
      </JelentkezesProvider>
    </>
  );
}

export default App;
