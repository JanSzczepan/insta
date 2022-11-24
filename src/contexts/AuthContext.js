import { createContext, useEffect, useReducer } from 'react'
import { SIGN_IN, USER_NULL } from '../constants/actions'
import { USER_PROFILE } from '../constants/secureStorageKeys'
import { authReducer } from '../reducers/AuthReducer'
import { getFromSecureStorage } from '../utils/secureStorage'

const initialState = {
   isSignedIn: false,
   user: undefined,
}

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
   const [userState, dispatch] = useReducer(authReducer, initialState)

   useEffect(() => {
      const getUser = async () => {
         const user = await getFromSecureStorage(USER_PROFILE)
         if (user) {
            const parsedUser = JSON.parse(user)
            dispatch({
               type: SIGN_IN,
               payload: parsedUser.user,
            })
         } else {
            dispatch({
               type: USER_NULL,
            })
         }
      }

      getUser()
   }, [])

   return <AuthContext.Provider value={{ userState, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
