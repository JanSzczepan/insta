import { useState } from 'react'
import { SIGN_IN, SIGN_OUT } from '../constants/actions'
import { USER_PROFILE } from '../constants/secureStorageKeys'
import { supabase } from '../supabase/supabaseClient'
import { deleteFromSecureStorage, saveToSecureStorage } from '../utils/secureStorage'
import { useAuthContext } from './useAuthContext'

const useLogout = () => {
   const [isLoading, setIsLoading] = useState(null)
   const [error, setError] = useState(null)
   const { dispatch } = useAuthContext()

   const logout = async () => {
      setIsLoading(true)
      setError(false)

      try {
         const error = await deleteFromSecureStorage(USER_PROFILE)

         if (error) {
            setError(error)
            throw new Error(error)
         } else {
            dispatch({ type: SIGN_OUT })
         }
      } catch (error) {
         console.log(error)
      }

      setIsLoading(false)
   }

   return { logout, isLoading, error }
}

export default useLogout
