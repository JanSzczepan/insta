import { useCallback, useState } from 'react'
import { View, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AntDesign } from '@expo/vector-icons'
import { CustomButton, Header, Paragraph } from '../../components'
import useSignup from '../../hooks/useSignup'
import styles from './styles'
import useLogin from '../../hooks/useLogin'

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

   const onSubmit = useCallback(({ email, password }) => {
      isLogIn ? login(email, password) : signup(email, password)
   }, [])

   return (
      <View style={styles.container}>
         <Header variant='textLarge'>
            {!isLogIn && (
               <CustomButton
                  handleOnPress={handleSetIsLogIn}
                  buttonVariant='arrow'
                  textVariant={['textMedium', 'black']}
               >
                  <AntDesign
                     name='arrowleft'
                     size={24}
                     color='black'
                  />
               </CustomButton>
            )}
            {isLogIn ? 'Login' : 'Register'}
         </Header>
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
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
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
                           style={styles.input}
                           onBlur={onBlur}
                           onChangeText={onChange}
                           value={value}
                        />
                        {errors.passwordConfirm && <Paragraph variant={['textSmall', 'red']}>{errors.passwordConfirm.message}</Paragraph>}
                     </>
                  )}
                  name={'passwordConfirm'}
               />
            )}
         </View>
         <CustomButton
            handleOnPress={handleSubmit(onSubmit)}
            buttonVariant='auth'
            textVariant={['textMedium', 'white']}
         >
            {isLogIn ? 'Login' : 'Register'}
         </CustomButton>
         {isLogIn && (
            <CustomButton
               handleOnPress={handleSetIsLogIn}
               buttonVariant='wannaAuth'
               textVariant={['textMedium', 'white']}
            >
               Signup
            </CustomButton>
         )}
      </View>
   )
}

export default Auth
