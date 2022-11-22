import MainApp from './MainApp'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthContextProvider from './src/contexts/AuthContext'
import { CustomStatusBar } from './src/components'
import UserInfoContextProvider from './src/contexts/UserInfoContext'

const queryClient = new QueryClient()

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <AuthContextProvider>
            <UserInfoContextProvider>
               <CustomStatusBar />
               <MainApp />
            </UserInfoContextProvider>
         </AuthContextProvider>
      </QueryClientProvider>
   )
}

export default App
