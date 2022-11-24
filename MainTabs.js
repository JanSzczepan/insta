import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomButton } from './src/components'
import { CreatePost, Home, Profile, Search } from './src/screens'
import theme from './src/constants/theme'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postPost } from './src/api'
import { POSTS_KEY } from './src/constants/queryKeys'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useRef, useState } from 'react'

const Tabs = createBottomTabNavigator()

const MainTabs = () => {
   const [photo, setPhoto] = useState()
   const [value, setValue] = useState('')

   const { navigate } = useNavigation()

   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: postPost,
      onSuccess: () => {
         setValue('')
         setPhoto(undefined)
         queryClient.invalidateQueries({ queryKey: [POSTS_KEY] })
         navigate('Home')
      },
   })

   const onSubmit = () => {
      const description = value
      if (!description) return
      const image_url = photo ? photo : null
      mutation.mutate({ description, image_url })
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
            // component={CreatePost}
            children={() => (
               <CreatePost
                  // route={params {photo: null}
                  setPhoto={setPhoto}
                  photo={photo}
                  value={value}
                  setValue={setValue}
               />
            )}
            options={{
               headerTitle: 'New Post',
               headerRight: () => (
                  <CustomButton
                     handleOnPress={onSubmit}
                     buttonVariant='check'
                  >
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

export default MainTabs
