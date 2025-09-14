import AppContextProvider from './store/context'
import Companies from './components/company/company'
import './App.css'


function App() {

  return (
    <>
      <div className="card">
        <AppContextProvider>
          <Companies/>
        </AppContextProvider>
      </div>
    </>
  )
}

export default App
