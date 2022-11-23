import { FlatList, Text, View } from 'react-native'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './styles'
import { deletePost, getPost } from '../../api'
import { AddComment, Comment, CustomButton, Post } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import useComment from '../../hooks/useComment'
import useCreator from '../../hooks/useCreator'

const PostDetails = ({ route }) => {
   const { id, isComment } = route.params
   const commentRef = useRef(null)

   const {
      userState: { user },
   } = useAuthContext()

   const { comments } = useComment(id)
   // const { user } = useCreator(comments)

   const { navigate } = useNavigation()
   const queryClient = useQueryClient()

   const { data } = useQuery({ queryKey: ['post', id], queryFn: () => getPost(id) })

   const mutation = useMutation({
      mutationFn: deletePost,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
         navigate('Home')
      },
   })

   const handleDelete = useCallback(() => {
      mutation.mutate(id)
   }, [])

   if (!data) return null

   const focusComment = () => {
      commentRef.current.focus()
   }

   const unFocusComment = () => {
      commentRef.current.blur()
   }

   return (
      <>
         <Post
            post={data.data}
            isDetail={true}
            focusComment={focusComment}
            unFocusComment={unFocusComment}
         />
         <View style={styles.divider} />
         <View style={styles.contentWrapper}>
            {Boolean(comments?.length) && (
               <FlatList
                  data={comments}
                  renderItem={({ item }) => <Comment comment={item} />}
                  keyExtractor={(item) => item.id}
               />
            )}
         </View>
         <AddComment
            postId={id}
            isComment={isComment}
            commentRef={commentRef}
         />
      </>
   )

   // return (
   //    <View style={styles.container}>
   //       <Text>{id}</Text>
   //       {data?.data?.creator_uuid === user?.id && (
   //          <CustomButton
   //             handleOnPress={handleDelete}
   //             buttonVariant='deletePost'
   //             textVariant={['textMedium', 'red']}
   //          >
   //             Delete
   //          </CustomButton>
   //       )}
   //    </View>
   // )
}

export default PostDetails
