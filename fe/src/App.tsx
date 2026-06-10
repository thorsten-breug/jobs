import React from 'react'
import AppContextProvider from './store/context'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloakClient from "./keycloak";
import Main from './components/main'
import './App.css'

function App() {

  return (
    <React.StrictMode>
      <ReactKeycloakProvider
        authClient={keycloakClient}
        initOptions={{
          onLoad: 'check-sso', // "login-required", 
        }}
      >
        <AppContextProvider>
          <Main />
        </AppContextProvider>
      </ReactKeycloakProvider>
    </React.StrictMode>
  )
}


export default App
