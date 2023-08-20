import { useContext, useEffect } from "react";
import { GlobalContext } from "./context/globalContext";
import Login from "./views/Login/Login";

function App() {

  const context = useContext(GlobalContext);
  const { setLogged } = context;

  // LOGIN PERSISTANCE
  useEffect(() => {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem("tekiUser"));
    if(getUserFromLocalStorage){
      setLogged(getUserFromLocalStorage);
    }else{
      setLogged(false);
    }
  }, []);

  return (
    <div>
      <Login/>
    </div>
  );
}

export default App;
