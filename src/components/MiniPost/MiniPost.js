import { useNavigation } from '@react-navigation/native'
import { Pressable } from 'react-native'
import CustomImage from '../CustomImage/CustomImage'
import styles from './styles'

const MiniPost = ({ post }) => {
   const { image_url, id } = post

   const { navigate } = useNavigation()

   const navigateToPost = (id, isComment) => {
      navigate('PostDetails', { id, isComment })
   }

   return (
      <Pressable
         style={styles.container}
         onPress={() => {
            navigateToPost(id, false)
         }}
      >
         <CustomImage
            variant='miniPost'
            // source={'https://static01.nyt.com/images/2021/12/12/magazine/12mag-LOR-1/12mag-LOR-1-superJumbo.jpg'}
            source={image_url}
         />
      </Pressable>
   )
}

export default MiniPost
