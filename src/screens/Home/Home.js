import { FlatList, View } from 'react-native'
import { Post } from '../../components'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'
import usePosts from '../../hooks/usePosts'

const Home = () => {
   const { user } = useUserInfoContext()

   const { navigate } = useNavigation()

   useEffect(() => {
      if (user) {
         if (!user.first_name || !user.last_name) {
            navigate('UserInfo')
         }
      }
   }, [user, navigate])

   if (!user) return null

   const { posts } = usePosts(user.id)

   if (!posts) return null
   // const { userState } = useAuthContext()
   // const { data: userData } = useQuery({ queryKey: ['users'], queryFn: () => getUserData(userState.user?.id), enabled: !!userState.user }, { enabled: !!userState.user })

   // const { navigate } = useNavigation()

   // useEffect(() => {
   //    if (userData && userState.user) {
   //       if (!userData.data.first_name || !userData.data.last_name) {
   //          navigate('UserInfo')
   //       }
   //    }
   // }, [userData, navigate])

   // if (!userData || !userState.user) return null

   return (
      <View>
         <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
         />
      </View>
   )
}

export default Home
