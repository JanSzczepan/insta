import { FlatList, View } from 'react-native'
import { CustomButton, CustomImage, Paragraph, Post } from '../../components'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import useLogout from '../../hooks/useLogout'
import useUserPosts from '../../hooks/useUserPosts'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import MiniPost from '../../components/MiniPost/MiniPost'
import styles from './styles'
import theme from '../../constants/theme'
import { useState } from 'react'

const Profile = () => {
   const [isGrid, setIsGrid] = useState(true)
   const { user, isLoading: isUserLoading } = useUserInfoContext()

   const { posts, isLoading } = useUserPosts(user?.id)

   const { logout } = useLogout()

   if (isUserLoading) return null
   if (isLoading) return null
   // if (!posts) return null

   const { first_name, last_name, email, image_url } = user

   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.userContainer}>
            <View style={styles.userNameContainer}>
               <CustomImage
                  variant='user'
                  source={image_url}
               />
               <Paragraph variant={['textMedium', 'black', 'semiBold']}>
                  {first_name} {last_name}
               </Paragraph>
            </View>
            <View>
               <View style={styles.textContainer}>
                  <Paragraph variant={['textSmall', 'black']}>{email}</Paragraph>
               </View>
               <View style={styles.textContainer}>
                  <Paragraph variant={['textSmall', 'black']}>
                     {posts?.length || '0'} Post{posts?.length !== 1 && 's'}
                  </Paragraph>
               </View>
               <CustomButton
                  handleOnPress={logout}
                  buttonVariant='logout'
                  textVariant={['textMedium', 'white']}
               >
                  <MaterialIcons
                     name='logout'
                     size={theme.SIZES.large}
                     color={theme.COLORS.black}
                  />
               </CustomButton>
            </View>
         </View>
         <View style={styles.buttonsContainer}>
            <CustomButton
               handleOnPress={() => setIsGrid(true)}
               buttonVariant='filter'
            >
               <MaterialIcons
                  name='grid-on'
                  size={theme.SIZES.xlarge}
                  color={isGrid ? theme.COLORS.black : theme.COLORS.mediumgrey}
               />
            </CustomButton>
            <CustomButton
               handleOnPress={() => setIsGrid(false)}
               buttonVariant='filter'
            >
               <MaterialIcons
                  name='format-list-bulleted'
                  size={theme.SIZES.xlarge}
                  color={!isGrid ? theme.COLORS.black : theme.COLORS.mediumgrey}
               />
            </CustomButton>
         </View>
         <View style={styles.postsContainer}>
            <FlatList
               data={posts}
               renderItem={({ item }) => (isGrid ? <MiniPost post={item} /> : <Post post={item} />)}
               keyExtractor={(item) => item.id}
               numColumns={isGrid ? 3 : 1}
               key={isGrid}
            />
         </View>
      </SafeAreaView>
   )
}

export default Profile
