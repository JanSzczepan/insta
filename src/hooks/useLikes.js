import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { checkLike, createLike, deleteLike, getLikes } from '../api'
import { LIKES_KEY } from '../constants/queryKeys'
import { useUserInfoContext } from './useUserInfoContext'

const useLikes = (postId, creatorId) => {
   const { data, isLoading: isQueryLoading, isError, error } = useQuery({ queryKey: [LIKES_KEY, postId, creatorId], queryFn: () => getLikes(postId) })
   const queryClient = useQueryClient()

   const [isLoading, setIsLoading] = useState(false)
   const [isLiked, setIsLiked] = useState(undefined)

   const likes = data ? data.data : null

   useEffect(() => {
      checkIsLiked(postId, creatorId)
   }, [likes])

   const { user } = useUserInfoContext()

   if (!user) return null

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
      // console.log({ postId }, { creatorId }, { data: data.data })
      const index = data?.data?.findIndex((item) => item.creator_uuid === user?.id)
      // console.log({ postId }, { index })
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

   const likePost = async (postId, creatorId) => {
      setIsLoading(true)
      const isLiked = await checkIsLiked(postId, creatorId)
      console.log({ isLiked })

      const like = likes.filter((l) => l.creator_uuid === user?.id)
      console.log({ like })
      isLiked ? await removeLike(like[0]?.id) : await addLike(postId, user?.id)

      setIsLoading(false)
   }

   return { likes, isLiked, checkIsLiked, addLike, removeLike, likePost, isLoading, isQueryLoading, isError, error }
}

export default useLikes
