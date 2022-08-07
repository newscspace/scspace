import { useHistory } from "react-router";

function Logout(){
  const history = useHistory();
  localStorage.removeItem('scspacetoken');
  history.push("/");
}

export default Logout;