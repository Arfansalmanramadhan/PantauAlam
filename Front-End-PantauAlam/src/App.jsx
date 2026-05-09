
import {GlobalContext} from './context'
import {RouterProvider} from 'react-router-dom'
import {router} from './routers'
import './App.css'

function App() {

  return (
    <>
      <GlobalContext.Provider value={{}} >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
      
    </>
  )
}

export default App
