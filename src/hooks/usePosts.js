import { useQuery } from '@tanstack/react-query'
import { getPosts } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'

const usePosts = () => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY], queryFn: getPosts })

   const posts = data ? [...data.data].reverse() : null

   return { posts, isLoading, isError, error }
}

export default usePosts
