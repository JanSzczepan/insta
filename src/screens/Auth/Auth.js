import { useCallback, useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CustomButton, Header, Paragraph } from '../../components'
import useSignup from '../../hooks/useSignup'
import styles from './styles'
import useLogin from '../../hooks/useLogin'
import globalStyles from '../../constants/globalStyles'
import theme from '../../constants/theme'

const Auth = () => {
   const [isLogIn, setIsLogIn] = useState(true)
   const { signup } = useSignup()
   const { login } = useLogin()

   const validation = yup.object().shape({
      email: yup.string().email('Your email is not valid.').required('Please enter your email.'),
      password: yup.string().required('Please enter your password.').min(8, 'Your password is too short.'),
      passwordConfirm: !isLogIn
         ? yup
              .string()
              .required('Please retype your password.')
              .oneOf([yup.ref('password')], 'Your passwords do not match.')
         : false,
   })

   const {
      control,
      handleSubmit,
      formState: { errors },
   } = useForm({
      resolver: yupResolver(validation),
      defaultValues: {
         email: '',
         password: '',
         passwordConfirm: '',
      },
   })

   const handleSetIsLogIn = () => setIsLogIn((prevState) => !prevState)

   const onSubmit = useCallback(
      (isLogIn) =>
         ({ email, password }) => {
            isLogIn ? login(email, password) : signup(email, password)
         },
      []
   )

   return (
      <View style={styles.container}>
         <Header
            headerVariant='auth'
            textVariant={['textXXXLarge', 'black', 'center', 'insta']}
         >
            Instagram
         </Header>
         <View>
            <Controller
               control={control}
               render={({ field: { onChange, onBlur, value } }) => (
                  <>
                     <TextInput
                        style={globalStyles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder='Email'
                        cursorColor={theme.COLORS.grey}
                     />
                     {errors.email && <Paragraph variant={['textSmall', 'red']}>{errors.email.message}</Paragraph>}
                  </>
               )}
               name={'email'}
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
                        placeholder='Password'
                        cursorColor={theme.COLORS.grey}
                        secureTextEntry
                     />
                     {errors.password && <Paragraph variant={['textSmall', 'red']}>{errors.password.message}</Paragraph>}
                  </>
               )}
               name={'password'}
            />
            {!isLogIn && (
               <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                     <>
                        <TextInput
                           style={globalStyles.input}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                           placeholder='Confirm password'
                           cursorColor={theme.COLORS.grey}
                           secureTextEntry
                        />
                        {errors.passwordConfirm && <Paragraph variant={['textSmall', 'red']}>{errors.passwordConfirm.message}</Paragraph>}
                     </>
                  )}
                  name={'passwordConfirm'}
               />
            )}
         </View>
         <CustomButton
            handleOnPress={handleSubmit(onSubmit(isLogIn))}
            buttonVariant='auth'
            textVariant={['textMedium', 'white', 'center', 'semiBold']}
         >
            {isLogIn ? 'Log In' : 'Register'}
         </CustomButton>
         <View style={styles.wannaAuthWrapper}>
            <Paragraph variant={['textSmall', 'black']}>{isLogIn ? "Don't have an account?" : 'Already have an account?'}</Paragraph>
            <CustomButton
               handleOnPress={handleSetIsLogIn}
               buttonVariant='wannaAuth'
               textVariant={['textSmall', 'blue', 'semiBold']}
            >
               {isLogIn ? 'Sign Up' : 'Log In'}
            </CustomButton>
         </View>
      </View>
   )
}

export default Auth
