import { useCallback, useEffect, useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CustomButton, CustomImage, Paragraph } from '../../components'
import styles from './styles'
import { updateUserInfo } from '../../api'
import { useUserInfoContext } from '../../hooks/useUserInfoContext'
import globalStyles from '../../constants/globalStyles'
import theme from '../../constants/theme'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

const UserInfo = ({ route }) => {
   const [photo, setPhoto] = useState(route.params?.photo)

   useEffect(() => {
      setPhoto(route.params?.photo)
   }, [route.params?.photo])

   const validation = yup.object().shape({
      name: yup.string().required('Please type your name.'),
      surname: yup.string().required('Please type your surname.'),
   })

   const { navigate } = useNavigation()

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validation),
      defaultValues: {
         name: route.params?.first_name ? route.params?.first_name : '',
         surname: route.params?.last_name ? route.params?.last_name : '',
      },
   })

   const { user } = useUserInfoContext()

   const queryClient = useQueryClient()

   const mutation = useMutation({
      mutationFn: updateUserInfo,
      onSuccess: () => {
         queryClient.invalidateQueries(['users', user?.id])
         navigate(route.params?.isUpdate ? 'Profile' : 'Home')
      },
   })

   const onSubmit = useCallback(
      ({ name, surname }) => {
         const image_url = photo ? photo : null
         const { id } = user
         mutation.mutate({ id, first_name: name, last_name: surname, image_url })
      },
      [photo]
   )

   const pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [1, 1],
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
               variant='userInfo'
               source={photo}
            />
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
         <View style={styles.buttonsContainer}>
            <CustomButton
               handleOnPress={() => navigate('CameraScreen', { isUserImage: true })}
               buttonVariant='userInfo'
               textVariant={['medium', 'blue', 'center', 'semiBold']}
            >
               Camera
            </CustomButton>
            <CustomButton
               handleOnPress={pickImage}
               buttonVariant='userInfo'
               textVariant={['medium', 'blue', 'center', 'semiBold']}
            >
               Pick image
            </CustomButton>
         </View>
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
