import { useQuery, useMutation } from '@tanstack/react-query'
import { getPosts, postPost } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'

const usePosts = (userId) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY, userId], queryFn: getPosts })

   const posts = data?.data ? [...data.data].reverse() : null

   const mutation = useMutation({
      mutationFn: postPost,
   })

   const addPost = async (description, image_url, onSuccess) => {
      mutation.mutate({ description, image_url }, { onSuccess })
   }

   return { posts, addPost, isLoading, isError, error }
}

export default usePosts
