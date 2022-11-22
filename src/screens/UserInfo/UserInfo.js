import { useCallback } from 'react'
import { View, TextInput, Text, Image } from 'react-native'
import { useForm, Controller, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomButton, CustomImage, Paragraph } from '../../components'
import styles from './styles'
import UserPlaceholder from '../../../assets/images/UserPlaceholder.png'
import { updateUserInfo } from '../../api'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'

const UserInfo = () => {
   const validation = yup.object().shape({
      name: yup.string().required('Please type your name.'),
      surname: yup.string().required('Please type your surname.'),
   })

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validation),
      defaultValues: {
         name: '',
         surname: '',
         image: null,
      },
   })

   const { user } = useUserInfoContext()

   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: updateUserInfo,
      onSuccess: () => {
         console.log(user?.id)
         queryClient.invalidateQueries(['users', user?.id])
      },
   })

   const onSubmit = useCallback(({ name, surname, image }) => {
      const image_url = image ? Image.resolveAssetSource(image).uri : Image.resolveAssetSource(UserPlaceholder).uri
      const { id } = user
      mutation.mutate({ id, first_name: name, last_name: surname, img_url: image_url })
   }, [])

   return (
      <View>
         <Text>UserInfo</Text>
         <View style={styles.imageContainer}>
            <CustomImage variant='user' />
         </View>
         <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
               <>
                  <TextInput
                     style={styles.input}
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                     placeholder='Type your name'
                  />
                  {errors.name && <Paragraph variant={['textSmall', 'red']}>{errors.name.message}</Paragraph>}
               </>
            )}
            name={'name'}
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
                     placeholder='Type your surname'
                  />
                  {errors.surname && <Paragraph variant={['textSmall', 'red']}>{errors.surname.message}</Paragraph>}
               </>
            )}
            name={'surname'}
         />
         <CustomButton
            handleOnPress={handleSubmit(onSubmit)}
            buttonVariant='post'
            textVariant={['medium', 'white']}
         >
            Opublikuj
         </CustomButton>
      </View>
   )
}

export default UserInfo
