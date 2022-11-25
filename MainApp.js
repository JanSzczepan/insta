import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Welcome, Auth, PostDetails, UserInfo, CameraScreen } from './src/screens'
import { useUserInfoContext } from './src/hooks/useUserInfoContext'
import MainTabs from './MainTabs'
import { useAuthContext } from './src/hooks/useAuthContext'
import { MainLoader } from './src/components'

const nativeTheme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
   },
}

const Stack = createNativeStackNavigator()

const MainApp = () => {
   const { userState } = useAuthContext()
   const { user, isLoading } = useUserInfoContext()

   if (userState.user !== null && isLoading) return <MainLoader />

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
            <Stack.Screen
               name='CameraScreen'
               component={CameraScreen}
               options={{ headerTitle: 'Camera' }}
            ></Stack.Screen>
            <Stack.Screen
               name='UserInfo'
               component={UserInfo}
               options={{ headerShown: false }}
            />
         </Stack.Navigator>
      </NavigationContainer>
   )
}

export default MainApp
