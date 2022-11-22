import { FlatList, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getPosts, getUserData } from '../../api'
import { Post } from '../../components'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigation } from '@react-navigation/native'
import { useEffect } from 'react'

const Home = () => {
   const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })

   const { userState } = useAuthContext()
   const { data: userData } = useQuery({ queryKey: ['users'], queryFn: () => getUserData(userState.user?.id), enabled: !!userState.user }, { enabled: !!userState.user })

   const { navigate } = useNavigation()

   useEffect(() => {
      if (userData && userState.user) {
         if (!userData.data.first_name || !userData.data.last_name) {
            navigate('UserInfo')
         }
      }
   }, [userData, navigate])

   // if (!userData || !userState.user) return null

   return (
      <View>
         <FlatList
            data={data?.data}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
         />
      </View>
   )
}

export default Home
