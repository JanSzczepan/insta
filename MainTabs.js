import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomButton } from './src/components'
import { CreatePost, Home, Profile, Search } from './src/screens'
import theme from './src/constants/theme'
import { useQueryClient } from '@tanstack/react-query'
import { POSTS_KEY } from './src/constants/queryKeys'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import usePosts from './src/hooks/usePosts'
import { useUserInfoContext } from './src/hooks/useUserInfoContext'
import { ActivityIndicator } from 'react-native'

const Tabs = createBottomTabNavigator()

const MainTabs = () => {
   const [photo, setPhoto] = useState()
   const [value, setValue] = useState('')
   const [isLoading, setIsLoading] = useState(false)

   const { navigate } = useNavigation()

   const { user } = useUserInfoContext()
   const { addPost } = usePosts(user?.id)

   const queryClient = useQueryClient()

   const onSuccess = () => {
      setValue('')
      setPhoto(undefined)
      queryClient.invalidateQueries({ queryKey: [POSTS_KEY, user?.id] })
      navigate('Home')
      setIsLoading(false)
   }

   const onSubmit = () => {
      const description = value
      if (!description) return
      const image_url = photo ? photo : null
      setIsLoading(true)
      addPost(description, image_url, onSuccess)
   }

   return (
      <Tabs.Navigator initialRouteName='Home'>
         <Tabs.Screen
            name='Home'
            component={Home}
            options={{
               headerTitle: 'Instagram',
               headerTitleStyle: {
                  fontFamily: theme.FONTS.special,
                  fontSize: theme.SIZES.insta,
               },
               headerStyle: {
                  height: theme.SIZES.headerHeight,
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
            children={() => (
               <CreatePost
                  setPhoto={setPhoto}
                  photo={photo}
                  value={value}
                  setValue={setValue}
               />
            )}
            options={{
               headerTitle: 'New Post',
               headerStyle: {
                  height: theme.SIZES.headerHeight,
               },
               headerRight: () => (
                  <CustomButton
                     handleOnPress={onSubmit}
                     buttonVariant='check'
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <ActivityIndicator
                           size='large'
                           color={theme.COLORS.blue}
                        />
                     ) : (
                        <Feather
                           name='check'
                           size={theme.SIZES.xxlarge}
                           color={theme.COLORS.blue}
                        />
                     )}
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

export default MainTabs
