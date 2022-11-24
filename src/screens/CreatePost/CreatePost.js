import { useEffect } from 'react'
import { View, TextInput } from 'react-native'
import { CustomButton, CustomImage } from '../../components'
import styles from './styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import theme from '../../constants/theme'
import * as ImagePicker from 'expo-image-picker'

const CreatePost = ({ setPhoto, photo, value, setValue }) => {
   const route = useRoute()

   useEffect(() => {
      setPhoto(route?.params?.photo)
   }, [route?.params?.photo])

   const { navigate } = useNavigation()

   const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      })

      if (!result.canceled) {
         setPhoto(result.assets[0].uri)
      }
   }

   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <CustomImage
               variant='fullWidth'
               source={photo}
            />
         </View>
         <View style={styles.contentContainer}>
            <View>
               <TextInput
                  style={styles.input}
                  onChangeText={(text) => setValue(text)}
                  value={value}
                  multiline={true}
                  numberOfLines={3}
                  placeholder='Type your description...'
                  cursorColor={theme.COLORS.grey}
               />
            </View>
            <CustomButton
               handleOnPress={() => navigate('CameraScreen')}
               buttonVariant='auth'
               textVariant={['medium', 'white', 'center', 'semiBold']}
            >
               Camera
            </CustomButton>
            <CustomButton
               handleOnPress={pickImage}
               buttonVariant='pickImage'
               textVariant={['medium', 'blue', 'center', 'semiBold']}
            >
               Pick image
            </CustomButton>
         </View>
      </View>
   )
}

export default CreatePost
