import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { useAuthContext } from './src/hooks/useAuthContext'
import { useQuery } from '@tanstack/react-query'

import { Welcome, Auth, Home, Search, CreatePost, Profile, PostDetails, UserInfo } from './src/screens'
import theme from './src/constants/theme'
import { getUserData } from './src/api'

const nativeTheme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
   },
}

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

const MainTabs = () => (
   <Tabs.Navigator initialRouteName='Home'>
      <Tabs.Screen
         name='Home'
         component={Home}
         options={{
            headerTitle: 'Instagram',
            headerTitleStyle: {
               fontFamily: theme.FONTS.special,
               fontSize: theme.SIZES.xxlarge,
            },
            tabBarLabel: () => null,
            tabBarIcon: () => (
               <Octicons
                  name='home'
                  size={theme.SIZES.large}
                  color={theme.COLORS.black}
               />
            ),
         }}
      />
      <Tabs.Screen
         name='Search'
         component={Search}
         options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: () => (
               <Feather
                  name='search'
                  size={theme.SIZES.large}
                  color={theme.COLORS.black}
               />
            ),
         }}
      />
      <Tabs.Screen
         name='CreatePost'
         component={CreatePost}
         options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: () => (
               <MaterialIcons
                  name='create'
                  size={theme.SIZES.large}
                  color={theme.COLORS.black}
               />
            ),
         }}
      />
      <Tabs.Screen
         name='Profile'
         component={Profile}
         options={{
            headerShown: false,
            tabBarLabel: () => null,
            tabBarIcon: () => (
               <Feather
                  name='user'
                  size={theme.SIZES.large}
                  color={theme.COLORS.black}
               />
            ),
         }}
      />
   </Tabs.Navigator>
)

const MainApp = () => {
   const { userState } = useAuthContext()

   const [loaded] = useFonts({
      ProximaNovaBold: require('./assets/fonts/Proxima-Nova-Bold.ttf'),
      ProximaNovaSemiBold: require('./assets/fonts/Proxima-Nova-SemiBold.ttf'),
      ProximaNovaRegular: require('./assets/fonts/Proxima-Nova-Regular.ttf'),
      ProximaNovaLight: require('./assets/fonts/Proxima-Nova-Light.ttf'),
      Billabong: require('./assets/fonts/Billabong.ttf'),
   })

   const { data: userData } = useQuery({ queryKey: ['users'], queryFn: () => getUserData(userState.user?.id), enabled: !!userState.user }, { enabled: !!userState.user })

   ////////////////////////
   if (!loaded) return null

   return (
      <NavigationContainer theme={nativeTheme}>
         <Stack.Navigator initialRouteName='Welcome'>
            {userState.isSignedIn ? (
               <>
                  {Boolean(userData?.data.first_name && userData?.data.last_name) && (
                     <>
                        <Stack.Screen
                           name='MainTabs'
                           component={MainTabs}
                           options={{ headerShown: false }}
                        />
                        <Stack.Screen
                           name='PostDetails'
                           component={PostDetails}
                        ></Stack.Screen>
                     </>
                  )}
                  {Boolean(!userData?.data?.first_name || !userData?.data?.last_name) && (
                     <Stack.Screen
                        name='UserInfo'
                        component={UserInfo}
                        options={{ headerShown: false }}
                     />
                  )}
               </>
            ) : (
               <>
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
               </>
            )}
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default MainApp
