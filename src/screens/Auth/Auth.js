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
   const { signup, error: signupError } = useSignup()
   const { login, error: loginError } = useLogin()

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
      ({ email, password }) => {
         isLogIn ? login(email, password) : signup(email, password)
      },
      [isLogIn]
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
                     {errors.email && (
                        <View style={styles.errorContainer}>
                           <Paragraph variant={['textSmall', 'red']}>{errors.email.message}</Paragraph>
                        </View>
                     )}
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
                     {errors.password && (
                        <View style={styles.errorContainer}>
                           <Paragraph variant={['textSmall', 'red']}>{errors.password.message}</Paragraph>
                        </View>
                     )}
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
                        {errors.passwordConfirm && (
                           <View style={styles.errorContainer}>
                              <Paragraph variant={['textSmall', 'red']}>{errors.passwordConfirm.message}</Paragraph>
                           </View>
                        )}
                     </>
                  )}
                  name={'passwordConfirm'}
               />
            )}
         </View>
         {isLogIn && loginError && (
            <View style={styles.databaseErrorContainer}>
               <Paragraph variant={['textSmall', 'red']}>{loginError.message}</Paragraph>
            </View>
         )}
         {!isLogIn && signupError && (
            <View style={styles.databaseErrorContainer}>
               <Paragraph variant={['textSmall', 'red']}>{signupError.message}</Paragraph>
            </View>
         )}
         <CustomButton
            handleOnPress={handleSubmit(onSubmit)}
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
