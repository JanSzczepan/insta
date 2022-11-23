import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'

const usePosts = (userId) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY, userId], queryFn: getPosts })

   const posts = data ? [...data.data].reverse() : null

   return { posts, isLoading, isError, error }
}

export default usePosts
