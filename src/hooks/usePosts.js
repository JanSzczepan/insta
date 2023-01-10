import { useNavigation } from '@react-navigation/native'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { deletePost, getPosts, postPost } from '../api'
import { POSTS_KEY } from '../constants/queryKeys'
import { POSTS_LIMIT } from '../constants/index'

const usePosts = (userId) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [POSTS_KEY], queryFn: () => getPosts(0, POSTS_LIMIT - 1) })

   const queryClient = useQueryClient()
   const { navigate } = useNavigation()

   const [posts, setPosts] = useState(undefined)
   const [isMorePostsLoading, setIsMorePostLoading] = useState(false)
   const [isDeleteLoading, setIsDeleteLoading] = useState(false)

   const postsData = data?.data ? data.data : null

   useEffect(() => {
      setPosts(postsData)
   }, [postsData])

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

   const getMorePosts = async () => {
      setIsMorePostLoading(true)

      const { data } = await getPosts(posts.length, posts.length - 1 + POSTS_LIMIT)

      if (!data || !data?.length) {
         setIsMorePostLoading(false)
         return null
      }

      setPosts((prevState) => [...prevState, ...data])
      setIsMorePostLoading(false)
   }

   return { posts, addPost, deletePostFunction, getMorePosts, isLoading, isMorePostsLoading, isDeleteLoading, isError, error }
}

export default usePosts
