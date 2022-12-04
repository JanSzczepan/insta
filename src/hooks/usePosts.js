import { useNavigation } from '@react-navigation/native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deletePost, getPosts, postPost } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'

const usePosts = (userId) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY, userId], queryFn: getPosts })

   const posts = data?.data ? data.data : null

   const queryClient = useQueryClient()
   const { navigate } = useNavigation()

   const [isDeleteLoading, setIsDeleteLoading] = useState(false)

   const addMutation = useMutation({
      mutationFn: postPost,
   })

   const deleteMutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [POSTS_KEY, userId] })
         navigate('Home')
         setIsDeleteLoading(false)
      },
   })

   const addPost = async (description, image_url, onSuccess) => {
      addMutation.mutate({ description, image_url }, { onSuccess })
   }

   const deletePostFunction = async (id) => {
      setIsDeleteLoading(true)
      deleteMutation.mutate(id)
   }

   return { posts, addPost, deletePostFunction, isLoading, isDeleteLoading, isError, error }
}

export default usePosts
