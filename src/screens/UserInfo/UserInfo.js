import { useCallback } from 'react'
import { View, TextInput, Image } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomButton, CustomImage, Paragraph } from '../../components'
import styles from './styles'
import UserPlaceholder from '../../../assets/images/UserPlaceholder.png'
import { updateUserInfo } from '../../api'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import globalStyles from '../../constants/globalStyles'
import theme from '../../constants/theme'

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
         queryClient.invalidateQueries(['users', user?.id])
      },
   })

   const onSubmit = useCallback(({ name, surname, image }) => {
      const image_url = image ? Image.resolveAssetSource(image).uri : Image.resolveAssetSource(UserPlaceholder).uri
      const { id } = user
      mutation.mutate({ id, first_name: name, last_name: surname, img_url: image_url })
   }, [])

   return (
      <View style={styles.container}>
         <View style={styles.imageContainer}>
            <CustomImage variant='userInfo' />
         </View>
         <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
               <>
                  <TextInput
                     style={globalStyles.input}
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                     placeholder='Type your name'
                     cursorColor={theme.COLORS.grey}
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
                     style={globalStyles.input}
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                     placeholder='Type your surname'
                     cursorColor={theme.COLORS.grey}
                  />
                  {errors.surname && <Paragraph variant={['textSmall', 'red']}>{errors.surname.message}</Paragraph>}
               </>
            )}
            name={'surname'}
         />
         <CustomButton
            handleOnPress={handleSubmit(onSubmit)}
            buttonVariant='auth'
            textVariant={['medium', 'white', 'center', 'semiBold']}
         >
            Save
         </CustomButton>
      </View>
   )
}

export default UserInfo
