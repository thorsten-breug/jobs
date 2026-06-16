import { useEffect, useContext } from 'react'
import { AppContext } from "../store/context"
import { AppAction } from "../store/action"
import { useKeycloak } from "@react-keycloak/web";
import Login from './login'
import Companies from './company/company'

export default () => {
  const { keycloak } = useKeycloak();
  const isLoggedIn = keycloak.authenticated;
  const {state: { error }, dispatch: disp} = useContext(AppContext);
  useEffect(() => {
      if (error) {
          // clear error in store
          disp({
              type: AppAction.ERROR,
              error: null,
          })
          alert(error);
      }
  }, [error])
  if (!isLoggedIn) 
    return <Login />;
  
  return (
    <div className="card">
        <Companies />
    </div>
  );
};
