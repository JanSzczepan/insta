import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createComment, deleteComment, getComments } from '../api'
import { COMMENTS_KEY } from '../constants/queryKeys'

const useComment = (postId) => {
   const { data, isLoading, isError, error } = useQuery({ queryKey: [COMMENTS_KEY, postId], queryFn: () => getComments(postId) })
   const queryClient = useQueryClient()

   const comments = data ? data.data : null

   const mutationAdd = useMutation({
      mutationFn: createComment,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [COMMENTS_KEY] })
      },
   })

   const mutationRemove = useMutation({
      mutationFn: deleteComment,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [COMMENTS_KEY] })
      },
   })

   const addComment = async (comment, postId) => {
      mutationAdd.mutate({ comment, postId })
   }

   const removeComment = async (commentId) => {
      mutationRemove.mutate(commentId)
   }

   return { comments, addComment, removeComment, isLoading }
}

export default useComment
