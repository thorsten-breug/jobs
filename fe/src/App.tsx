import AppContextProvider from './store/context'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloakClient from "./keycloak";
import Main from './components/main'
import './App.css'

function App() {

  return (
    <AppContextProvider>
      <ReactKeycloakProvider
        authClient={keycloakClient}
        initOptions={{
          onLoad: 'check-sso', // "login-required", 
        }}
    >
        <Main />
      </ReactKeycloakProvider>
    </AppContextProvider>
  )
}


export default App
