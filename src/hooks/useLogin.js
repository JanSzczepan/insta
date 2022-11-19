import { useState } from 'react'
import { SIGN_IN } from '../constants/actions'
import { supabase } from '../supabase/supabaseClient'
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
            // console.log(data.user)
            dispatch({
               type: SIGN_IN,
               payload: data.user,
            })
         }
      } catch (error) {
         console.log(error)
      }

      setIsLoading(false)
   }

   //    const response = await fetch('/api/user/login', {
   //       method: 'POST',
   //       body: JSON.stringify({ email, password }),
   //       headers: {
   //          'Content-Type': 'application/json',
   //       },
   //    })
   //    const json = await response.json()

   //    if (!response.ok) {
   //       setError(json.err)
   //       setIsLoading(false)
   //    }
   //    if (response.ok) {
   //       localStorage.setItem('user', JSON.stringify(json))

   //       dispatch({ type: 'LOGIN', payload: json })

   //       setIsLoading(false)
   //    }
   // }

   return { login, isLoading, error }
}

export default useLogin
