import { useNavigation } from '@react-navigation/native'
import { Pressable, Text, View } from 'react-native'
import styles from './styles'

const Post = ({ post }) => {
   const { description, id } = post

   const { navigate } = useNavigation()

   return (
      <Pressable
         onPress={() => {
            navigate('PostDetails', { id })
         }}
      >
         <View style={styles.container}>
            <Text>{description}</Text>
         </View>
      </Pressable>
   )
}

export default Post
