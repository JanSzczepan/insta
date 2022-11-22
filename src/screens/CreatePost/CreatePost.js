import { View, TextInput } from 'react-native'
import { useForm, Controller, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomButton, CustomImage, Paragraph } from '../../components'
import styles from './styles'
import { postPost } from '../../api'
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { POSTS, POSTS_KEY } from '../../constants/queryKeys'

const CreatePost = () => {
   const validation = yup.object().shape({
      title: yup.string().required('Please type post title.').max(20, 'Your title is to long'),
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
         title: '',
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

   const onSubmit = useCallback(({ title, description, image }) => {
      const image_url = image ? Image.resolveAssetSource(image).uri : null
      mutation.mutate({ title, description, image_url })
   }, [])

   const returnValue = (control, name) => {
      const value = useWatch({ control, name })

      return value
   }

   const title = returnValue(control, 'title')
   const description = returnValue(control, 'description')

   return (
      <>
         <View style={styles.container}>
            <Paragraph variant={['textMedium', 'black']}>{title}</Paragraph>
            <View style={styles.imageContainer}>
               <CustomImage variant='fullWidth' />
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
                           placeholder='Type your title'
                        />
                        {errors.title && <Paragraph variant={['textSmall', 'red']}>{errors.title.message}</Paragraph>}
                     </>
                  )}
                  name={'title'}
               />
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
