import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'

import { Welcome, Auth } from './src/screens'

const theme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
   },
}

const Stack = createNativeStackNavigator()

export default function App() {
   const [loaded] = useFonts({
      ProximaNovaBold: require('./assets/fonts/Proxima-Nova-Bold.ttf'),
      ProximaNovaSemiBold: require('./assets/fonts/Proxima-Nova-SemiBold.ttf'),
      ProximaNovaRegular: require('./assets/fonts/Proxima-Nova-Regular.ttf'),
      ProximaNovaLight: require('./assets/fonts/Proxima-Nova-Light.ttf'),
   })

   if (!loaded) return null

   return (
      <NavigationContainer theme={theme}>
         <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen
               name='Welcome'
               component={Welcome}
               options={{ headerShown: false }}
            />
            <Stack.Screen
               name='Auth'
               component={Auth}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   )
}
