import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useFonts } from 'expo-font'
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

import { Welcome, Auth, Home, Search, CreatePost, Profile, PostDetails, UserInfo, CameraScreen } from './src/screens'
import theme from './src/constants/theme'
import { useUserInfoContext } from './src/hooks/useUserInfoContext'
import { CustomButton } from './src/components'

const nativeTheme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
   },
}

const Stack = createNativeStackNavigator()
const Tabs = createBottomTabNavigator()

const MainTabs = () => {
   return (
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
               headerTitle: 'New Post',
               headerRight: () => (
                  <CustomButton buttonVariant='check'>
                     <Feather
                        name='check'
                        size={theme.SIZES.xxlarge}
                        color={theme.COLORS.blue}
                     />
                  </CustomButton>
               ),
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
}

const MainApp = () => {
   const [loaded] = useFonts({
      ProximaNovaBold: require('./assets/fonts/Proxima-Nova-Bold.ttf'),
      ProximaNovaSemiBold: require('./assets/fonts/Proxima-Nova-SemiBold.ttf'),
      ProximaNovaRegular: require('./assets/fonts/Proxima-Nova-Regular.ttf'),
      ProximaNovaLight: require('./assets/fonts/Proxima-Nova-Light.ttf'),
      Billabong: require('./assets/fonts/Billabong.ttf'),
   })

   const { user } = useUserInfoContext()

   if (!loaded) return null

   return (
      <NavigationContainer theme={nativeTheme}>
         <Stack.Navigator initialRouteName='Welcome'>
            {user ? (
               <>
                  {user.isFilled ? (
                     <>
                        <Stack.Screen
                           name='MainTabs'
                           component={MainTabs}
                           options={{ headerShown: false }}
                        />
                        <Stack.Screen
                           name='PostDetails'
                           component={PostDetails}
                           options={{ headerShown: false }}
                        ></Stack.Screen>
                        <Stack.Screen
                           name='CameraScreen'
                           component={CameraScreen}
                           options={{ headerTitle: 'Camera' }}
                        ></Stack.Screen>
                     </>
                  ) : (
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
