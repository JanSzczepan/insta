import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'

const useUserPosts = (userId) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY, userId], queryFn: () => getUserPosts(userId) })

   const posts = data?.data ? data.data : null

   return { posts, isLoading, isError, error }
}

export default useUserPosts
