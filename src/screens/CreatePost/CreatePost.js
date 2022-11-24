import { useCallback } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomButton, CustomImage, Paragraph } from '../../components'
import styles from './styles'
import { postPost } from '../../api'
import { useNavigation } from '@react-navigation/native'
import { POSTS_KEY } from '../../constants/queryKeys'

const CreatePost = ({ route }) => {
   const photo = route.params?.photo

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

   const onSubmit = useCallback(({ description, image }) => {
      const image_url = image ? Image.resolveAssetSource(image).uri : null
      mutation.mutate({ description, image_url })
   }, [])

   const returnValue = (control, name) => {
      const value = useWatch({ control, name })

      return value
   }

   const description = returnValue(control, 'description')
   console.log('yooooooooooooo')
   return (
      <>
         <View style={styles.container}>
            <View style={styles.imageContainer}>
               <CustomImage
                  variant='fullWidth'
                  source={photo}
               />
            </View>
            <Paragraph variant={['textMedium', 'black']}>{description}</Paragraph>
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
                           numberOfLines={4}
                           placeholder='Type your description'
                        />
                        {errors.description && <Paragraph variant={['textSmall', 'red']}>{errors.description.message}</Paragraph>}
                     </>
                  )}
                  name={'description'}
               />
            </View>
            <CustomButton
               handleOnPress={() => navigate('CameraScreen')}
               buttonVariant='post'
               textVariant={['medium', 'white']}
            >
               Camera
            </CustomButton>
            <CustomButton
               handleOnPress={handleSubmit(onSubmit)}
               buttonVariant='post'
               textVariant={['medium', 'white']}
            >
               Opublikuj
            </CustomButton>
         </View>
      </>
   )
}

export default CreatePost
