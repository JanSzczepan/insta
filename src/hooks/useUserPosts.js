import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'

const useUserPosts = (userId) => {
   console.log('!!!!!!!!!!', userId)
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY, userId], queryFn: () => getUserPosts(userId) })

   const posts = data ? [...data.data].reverse() : null

   return { posts, isLoading, isError, error }
}

export default useUserPosts
