import { Text, View } from 'react-native'
import styles from './styles'

const Post = ({ post }) => {
   const { description } = post
   return (
      <View style={styles.container}>
         <Text>{description}</Text>
      </View>
   )
}

export default Post
