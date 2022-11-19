import { useState } from 'react'
import { SIGN_IN } from '../constants/actions'
import { USER_PROFILE } from '../constants/secureStorageKeys'
import { supabase } from '../supabase/supabaseClient'
import { saveToSecureStorage } from '../utils/secureStorage'
import { useAuthContext } from './useAuthContext'

const useLogin = () => {
   const [isLoading, setIsLoading] = useState(null)
   const [error, setError] = useState(null)
   const { dispatch } = useAuthContext()

   const login = async (email, password) => {
      setIsLoading(true)
      setError(false)

      try {
         console.log(email, password)
         const { data, error } = await supabase.auth.signInWithPassword({ email, password })

         //////////////////////////
         if (error) {
            setError(error)
            throw new Error(error)
         } else {
            const value = JSON.stringify({ user: data.session.user, token: data.session.access_token })
            saveToSecureStorage(USER_PROFILE, value)
            dispatch({
               type: SIGN_IN,
               payload: data.session.user,
            })
         }
      } catch (error) {
         console.log(error)
      }

      setIsLoading(false)
   }

   return { login, isLoading, error }
}

export default useLogin
