import { useNavigation } from '@react-navigation/native'
import { Pressable, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Paragraph from '../Paragraph/Paragraph'
import CustomImage from '../CustomImage/CustomImage'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import styles from './styles'
import theme from '../../constants/theme'

const Post = ({ post }) => {
   const { description, id } = post

   const { navigate } = useNavigation()

   const { user } = useUserInfoContext()

   const { first_name, last_name } = user
   // console.log('ssssssssssss', post)
   return (
      <View style={styles.container}>
         <View style={styles.nameContainer}>
            <View style={styles.miniImageContainer}>
               <CustomImage variant='miniuser' />
            </View>
            <Paragraph variant={['black', 'textMedium', 'semiBold']}>
               {first_name} {last_name}
            </Paragraph>
         </View>
         <Pressable
            onPress={() => {
               navigate('PostDetails', { id })
            }}
         >
            <View style={styles.imageContainer}>
               <CustomImage
                  variant='fullWidth'
                  source='https://static01.nyt.com/images/2021/12/12/magazine/12mag-LOR-1/12mag-LOR-1-superJumbo.jpg'
               />
            </View>
         </Pressable>
         <View style={styles.contentWrapper}>
            <View style={styles.iconsContainer}>
               <FontAwesome5
                  name='heart'
                  size={theme.SIZES.xlarge}
                  color={theme.COLORS.black}
                  style={styles.icon}
               />
               <FontAwesome5
                  name='comment'
                  size={theme.SIZES.xlarge}
                  color={theme.COLORS.black}
                  style={styles.icon}
               />
            </View>
            <View style={styles.likesContainer}>
               <Paragraph variant={['black', 'textMedium', 'semiBold']}>156 likes</Paragraph>
            </View>
            <View style={styles.commentContainer}>
               <View style={styles.commentNameContainer}>
                  <Paragraph variant={['black', 'textMedium', 'semiBold']}>
                     {first_name} {last_name}
                  </Paragraph>
               </View>
               <Paragraph variant={['black', 'textSmall']}>Koty to fajne zwierzaki</Paragraph>
            </View>
         </View>
      </View>
   )
}

export default Post
