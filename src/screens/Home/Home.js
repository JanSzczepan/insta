import { FlatList, View } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../../api'
import { Post } from '../../components'

const Home = () => {
   const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
   // console.log(query?.data?.data)
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
