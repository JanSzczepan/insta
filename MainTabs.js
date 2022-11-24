import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Octicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { CustomButton } from './src/components'
import { CreatePost, Home, Profile, Search } from './src/screens'
import theme from './src/constants/theme'

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
                  <CustomButton
                     handleOnPress={() => {}}
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
