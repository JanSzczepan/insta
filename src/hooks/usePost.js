import { useQuery } from '@tanstack/react-query'
import { getPost } from '../api'
import { POST_KEY } from '../constants/queryKeys'

const usePost = (userId, postId) => {
   const { data, isLoading } = useQuery({ queryKey: [POST_KEY, userId, postId], queryFn: () => getPost(postId) })

   const post = data?.data ? data.data : null

   return { post, isLoading }
}

export default usePost
