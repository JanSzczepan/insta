import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Keyboard, Pressable, TouchableWithoutFeedback, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import Paragraph from '../Paragraph/Paragraph'
import CustomImage from '../CustomImage/CustomImage'
import styles from './styles'
import theme from '../../constants/theme'
import useCreator from '../../hooks/useCreator'
import useLikes from '../../hooks/useLikes'
import CustomButton from '../CustomButton/CustomButton'
import usePosts from '../../hooks/usePosts'

const Post = ({ post, isDetail = false, focusComment = () => {}, unFocusComment = () => {} }) => {
   const { description, id, creator_uuid, image_url } = post

   const { navigate } = useNavigation()

   const { creator, isLoading } = useCreator(creator_uuid)
   const { likes, isLiked, isLoading: isLikeLoading, likePost } = useLikes(id, creator_uuid)

   const { deletePostFunction, isDeleteLoading } = usePosts(creator?.uuid)

   if (isLoading) return null

   const { first_name, last_name, image_url: creatorImageUrl, uuid } = creator

   const returnLikes = (likes) => {
      if (!likes) return null
      const text = likes.length === 1 ? `${likes.length} like` : `${likes.length} likes`
      return text
   }

   const navigateToPost = (id, isComment, isDetail) => {
      if (isDetail && isComment) focusComment()

      if (isDetail) return

      navigate('PostDetails', { id, isComment })
   }

   return (
      <TouchableWithoutFeedback
         onPress={() => {
            Keyboard.dismiss()
            unFocusComment()
         }}
         accessible={false}
      >
         <View style={styles.container}>
            <View style={styles.nameContainer}>
               <View style={styles.miniImageContainer}>
                  <CustomImage
                     variant='miniuser'
                     source={creatorImageUrl}
                  />
               </View>
               <Paragraph variant={['black', 'textMedium', 'semiBold']}>
                  {first_name} {last_name}
               </Paragraph>
            </View>
            <Pressable
               onPress={() => {
                  navigateToPost(id, false, isDetail)
               }}
            >
               <View style={styles.imageContainer}>
                  <CustomImage
                     variant='fullWidth'
                     // source='https://static01.nyt.com/images/2021/12/12/magazine/12mag-LOR-1/12mag-LOR-1-superJumbo.jpg'
                     source={image_url}
                  />
               </View>
            </Pressable>
            <View style={styles.contentWrapper}>
               <View style={styles.iconsContainer}>
                  {isLikeLoading ? (
                     <AntDesign
                        name='heart'
                        size={theme.SIZES.xlarge}
                        color={theme.COLORS.red}
                        style={styles.icon}
                     />
                  ) : (
                     <CustomButton
                        handleOnPress={() => likePost(id, creator_uuid)}
                        buttonVariant='icon'
                        disabled={isLiked === undefined}
                     >
                        {isLiked ? (
                           <AntDesign
                              name='heart'
                              size={theme.SIZES.xlarge}
                              color={theme.COLORS.red}
                           />
                        ) : (
                           <AntDesign
                              name='hearto'
                              size={theme.SIZES.xlarge}
                              color={theme.COLORS.black}
                           />
                        )}
                     </CustomButton>
                  )}
                  <CustomButton
                     handleOnPress={() => navigateToPost(id, true, isDetail)}
                     buttonVariant='icon'
                  >
                     <FontAwesome5
                        name='comment'
                        size={theme.SIZES.xlarge}
                        color={theme.COLORS.black}
                     />
                  </CustomButton>
                  {uuid === creator_uuid && isDetail && (
                     <CustomButton
                        handleOnPress={() => deletePostFunction(id)}
                        buttonVariant='trashIcon'
                        disabled={isDeleteLoading}
                     >
                        {isDeleteLoading ? (
                           <ActivityIndicator
                              size='large'
                              color={theme.COLORS.blue}
                           />
                        ) : (
                           <FontAwesome5
                              name='trash-alt'
                              size={theme.SIZES.xlarge}
                              color={theme.COLORS.grey}
                           />
                        )}
                     </CustomButton>
                  )}
               </View>
               <View style={styles.likesContainer}>
                  <Paragraph variant={['black', 'textMedium', 'semiBold']}>{returnLikes(likes)}</Paragraph>
               </View>
               <View style={styles.commentContainer}>
                  <View style={styles.commentNameContainer}>
                     <Paragraph variant={['black', 'textMedium', 'semiBold']}>
                        {first_name} {last_name}
                     </Paragraph>
                  </View>
                  <Paragraph variant={['black', 'textSmall']}>{description}</Paragraph>
               </View>
            </View>
         </View>
      </TouchableWithoutFeedback>
   )
}

export default Post
