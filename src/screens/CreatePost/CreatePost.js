import { useCallback, useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomButton, CustomImage, Paragraph } from '../../components'
import styles from './styles'
import { postPost } from '../../api'
import { useNavigation } from '@react-navigation/native'
import { POSTS_KEY } from '../../constants/queryKeys'
import theme from '../../constants/theme'
import * as ImagePicker from 'expo-image-picker'

const CreatePost = ({ route }) => {
   // const photo = route.params?.photo
   const [photo, setPhoto] = useState(route.params?.photo)

   useEffect(() => {
      setPhoto(route.params?.photo)
   }, [route.params?.photo])

   const validation = yup.object().shape({
      description: yup.string().required('Please type post description.'),
   })

   const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validation),
      defaultValues: {
         description: '',
         image: null,
      },
   })

   const { navigate } = useNavigation()
   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: postPost,
      onSuccess: () => {
         reset()
         queryClient.invalidateQueries({ queryKey: [POSTS_KEY] })
         navigate('Home')
      },
   })

   const onSubmit = useCallback(
      (photo) =>
         ({ description }) => {
            const image_url = photo ? photo : null
            mutation.mutate({ description, image_url })
         },
      []
   )

   const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      })

      console.log(result)

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
               <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           style={styles.input}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           multiline={true}
                           numberOfLines={3}
                           placeholder='Type your description...'
                           cursorColor={theme.COLORS.grey}
                        />
                        {errors.description && <Paragraph variant={['textSmall', 'red']}>{errors.description.message}</Paragraph>}
                     </>
                  )}
                  name={'description'}
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
            <CustomButton
               handleOnPress={handleSubmit(onSubmit(photo))}
               buttonVariant='post'
               textVariant={['medium', 'white']}
            >
               Opublikuj
            </CustomButton>
         </View>
      </View>
   )
}

export default CreatePost
