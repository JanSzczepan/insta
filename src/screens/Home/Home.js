import { FlatList, View } from 'react-native'
import { MainLoader, Post } from '../../components'
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

   const { posts, getMorePosts, isLoading, isMorePostsLoading } = usePosts(user.id)

   if (isLoading || !posts) return <MainLoader />

   return (
      <View>
         <FlatList
            data={posts}
            renderItem={({ item }) => <Post post={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={() => !isMorePostsLoading && getMorePosts()}
            onEndReachedThreshold={1}
            overScrollMode='never'
         />
      </View>
   )
}

export default Home
