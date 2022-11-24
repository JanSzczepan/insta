import MainApp from './MainApp'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import AuthContextProvider from './src/contexts/AuthContext'
import { CustomStatusBar } from './src/components'
import UserInfoContextProvider from './src/contexts/UserInfoContext'

const queryClient = new QueryClient()

const App = () => {
   const [loaded] = useFonts({
      ProximaNovaBold: require('./assets/fonts/Proxima-Nova-Bold.ttf'),
      ProximaNovaSemiBold: require('./assets/fonts/Proxima-Nova-SemiBold.ttf'),
      ProximaNovaRegular: require('./assets/fonts/Proxima-Nova-Regular.ttf'),
      ProximaNovaLight: require('./assets/fonts/Proxima-Nova-Light.ttf'),
      Billabong: require('./assets/fonts/Billabong.ttf'),
   })

   if (!loaded) return null

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
