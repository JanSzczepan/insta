import { FlatList, Text, View } from 'react-native'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useAuthContext } from '../../hooks/useAuthContext'
import styles from './styles'
import { deletePost, getPost } from '../../api'
import { AddComment, Comment, CustomButton, MainLoader, Post } from '../../components'
import { useNavigation } from '@react-navigation/native'
import { useCallback, useRef } from 'react'
import useComment from '../../hooks/useComment'
import useCreator from '../../hooks/useCreator'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import usePost from '../../hooks/usePost'

const PostDetails = ({ route }) => {
   const { id, isComment } = route.params
   const commentRef = useRef(null)

   const { user, isLoading: isUserLoading } = useUserInfoContext()

   const { comments } = useComment(id)

   const { post, isLoading } = usePost(user?.id, id)

   if (isLoading || !post || isUserLoading) return <MainLoader />

   const focusComment = () => {
      commentRef.current.focus()
   }

   const unFocusComment = () => {
      commentRef.current.blur()
   }

   return (
      <>
         <Post
            post={post}
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
            unFocusComment={unFocusComment}
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
