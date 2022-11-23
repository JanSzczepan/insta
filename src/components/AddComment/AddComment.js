import { useState } from 'react'
import { TextInput, View } from 'react-native'
import theme from '../../constants/theme'
import useComment from '../../hooks/useComment'
import CustomButton from '../CustomButton/CustomButton'
import styles from './styles'

const AddComment = ({ postId, isComment, commentRef }) => {
   const { addComment } = useComment(postId)

   const [comment, setComment] = useState('')

   const handleOnPress = (comment, postId) => {
      if (!comment) return

      addComment(comment, postId)
      setComment('')
   }

   return (
      <View style={styles.container}>
         <View></View>
         <TextInput
            ref={commentRef}
            style={styles.commentInput}
            value={comment}
            onChangeText={(text) => setComment(text)}
            cursorColor={theme.COLORS.grey}
            placeholder='Comment...'
            autoFocus={isComment}
         />
         <CustomButton
            handleOnPress={() => handleOnPress(comment, postId)}
            buttonVariant='addComment'
            textVariant={['textMedium', 'blue', 'semiBold']}
         >
            Share
         </CustomButton>
      </View>
   )
}

export default AddComment
