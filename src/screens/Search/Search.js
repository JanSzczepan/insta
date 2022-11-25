import { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { MainLoader, SearchComponent } from '../../components'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import usePosts from '../../hooks/usePosts'
import styles from './styles'
import MiniPost from '../../components/MiniPost/MiniPost'

const Search = () => {
   const [value, setValue] = useState()

   const { user } = useUserInfoContext()
   const { posts, isLoading } = usePosts(user?.id)

   const [filteredPosts, setFilteredPosts] = useState(posts)

   useEffect(() => {
      setFilteredPosts(posts)
   }, [isLoading, posts.length])

   if (isLoading || !posts)
      return (
         <>
            <View style={styles.searchContainer}>
               <SearchComponent
                  value={value}
                  filterPosts={filterPosts}
               />
            </View>
            <MainLoader />
         </>
      )

   const filterPosts = (filterValue) => {
      if (!filterValue) {
         setFilteredPosts(posts)
      } else {
         const filter = posts.filter((post) => post.description.toLowerCase().includes(filterValue.toLowerCase()))
         setFilteredPosts(filter)
      }

      setValue(filterValue)
   }

   return (
      <>
         <View style={styles.searchContainer}>
            <SearchComponent
               value={value}
               filterPosts={filterPosts}
            />
         </View>
         <View style={styles.postsContainer}>
            <FlatList
               data={filteredPosts}
               renderItem={({ item }) => <MiniPost post={item} />}
               keyExtractor={(item) => item.id}
               numColumns={3}
            />
         </View>
      </>
   )
}

export default Search
