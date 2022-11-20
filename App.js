import MainApp from './MainApp'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthContextProvider from './src/contexts/AuthContext'
import { CustomStatusBar } from './src/components'

const queryClient = new QueryClient()

const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
         <AuthContextProvider>
            <CustomStatusBar />
            <MainApp />
         </AuthContextProvider>
      </QueryClientProvider>
   )
}

export default App
