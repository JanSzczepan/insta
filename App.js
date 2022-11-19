import MainApp from './MainApp'
import AuthContextProvider from './src/contexts/AuthContext'

const App = () => {
   return (
      <AuthContextProvider>
         <MainApp />
      </AuthContextProvider>
   )
}

export default App
