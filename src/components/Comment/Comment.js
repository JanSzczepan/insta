import { View } from 'react-native'
import useCreator from '../../hooks/useCreator'
import Paragraph from '../Paragraph/Paragraph'
import styles from './styles'

const Comment = ({ comment }) => {
   const { creator } = useCreator(comment.creator_uuid)

   if (!creator) return

   return (
      <View style={styles.commentContainer}>
         <View style={styles.commentNameContainer}>
            <Paragraph variant={['black', 'textMedium', 'semiBold']}>
               {creator.first_name} {creator.last_name}
            </Paragraph>
         </View>
         <Paragraph variant={['black', 'textSmall']}>{comment.body}</Paragraph>
      </View>
   )
}

export default Comment
