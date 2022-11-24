import { View, SafeAreaView, useWindowDimensions } from 'react-native'
import { useRef, useState } from 'react'
import { Camera } from 'expo-camera'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { CustomButton, CustomImage } from '../../components'
import { AntDesign } from '@expo/vector-icons'
import theme from '../../constants/theme'

const CameraScreen = ({ route }) => {
   const cameraRef = useRef()
   const [photo, setPhoto] = useState()
   const { navigate } = useNavigation()
   const isUserImage = route.params?.isUserImage

   const { width } = useWindowDimensions()
   const height = Math.round((width * 4) / 3)

   const takePic = async () => {
      const options = {
         quality: 1,
         base64: true,
         exif: false,
      }

      const newPhoto = await cameraRef.current.takePictureAsync(options)
      setPhoto(newPhoto)
   }

   if (photo) {
      const savePhoto = () => {
         navigate(isUserImage ? 'UserInfo' : 'CreatePost', { photo: 'data:image/jpg;base64,' + photo.base64 })
      }

      return (
         <SafeAreaView style={styles.wrapper}>
            <View style={[styles.imageContainer, isUserImage ? styles.imageUserContainer : null]}>
               <CustomImage
                  variant={isUserImage ? 'userCameraInfo' : 'fullWidth'}
                  source={'data:image/jpg;base64,' + photo.base64}
               />
            </View>
            <View style={styles.buttonsContainer}>
               <CustomButton
                  buttonVariant='imageIcon'
                  handleOnPress={() => setPhoto(undefined)}
               >
                  <AntDesign
                     name='arrowleft'
                     size={theme.SIZES.xxlarge}
                     color={theme.COLORS.black}
                  />
               </CustomButton>
               <CustomButton
                  buttonVariant='imageIcon'
                  handleOnPress={savePhoto}
               >
                  <AntDesign
                     name='arrowright'
                     size={theme.SIZES.xxlarge}
                     color={theme.COLORS.black}
                  />
               </CustomButton>
            </View>
         </SafeAreaView>
      )
   }

   return (
      <>
         <Camera
            ratio='4:3'
            style={[
               styles.cameraContainer,
               {
                  height: height,
                  width: '100%',
               },
            ]}
            ref={cameraRef}
         ></Camera>
         <View style={styles.cameraButtonContainer}>
            <CustomButton
               handleOnPress={takePic}
               buttonVariant='camera'
            />
         </View>
      </>
   )
}

export default CameraScreen
