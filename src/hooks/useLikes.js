import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { checkLike, createLike, deleteLike, getLikes, getUserData } from '../api'
import { LIKES_KEY } from '../constants/queryKeys'

const useLikes = (postId, creatorId) => {
   const { data, isLoading: isQueryLoading, isError, error } = useQuery({ queryKey: [LIKES_KEY, postId], queryFn: () => getLikes(postId) })
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)
   const [isLiked, setIsLiked] = useState(undefined)

   const likes = data ? data.data : null

   useEffect(() => {
      checkIsLiked(postId, creatorId)
   }, [likes])

   const mutationAdd = useMutation({
      mutationFn: createLike,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [LIKES_KEY] })
      },
   })

   const mutationRemove = useMutation({
      mutationFn: deleteLike,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [LIKES_KEY] })
      },
   })

   const checkIsLiked = async (postId, creatorId) => {
      const data = await checkLike({ postId, creatorId })
      const index = data?.data?.findIndex((item) => item.creator_uuid === creatorId)
      const isPostLiked = !Boolean(index == -1)
      setIsLiked(isPostLiked)

      return isPostLiked
   }

   const addLike = async (postId) => {
      mutationAdd.mutate(postId)
      setIsLiked(true)
   }

   const removeLike = async (likeId) => {
      mutationRemove.mutate(likeId)
      setIsLiked(false)
   }

   const likePost = async (postId, userId) => {
      setIsLoading(true)

      const isLiked = await checkIsLiked(postId, userId)

      const like = likes.filter((l) => l.creator_uuid === userId)

      isLiked ? await removeLike(like[0]?.id) : await addLike(postId, userId)

      setIsLoading(false)
   }

   return { likes, isLiked, checkIsLiked, addLike, removeLike, likePost, isLoading, isQueryLoading, isError, error }
}

export default useLikes
