import { createContext, useEffect, useReducer } from 'react'
import { SIGN_IN } from '../constants/actions'
import { USER_PROFILE } from '../constants/secureStorageKeys'
import { authReducer } from '../reducers/AuthReducer'
import { getFromSecureStorage } from '../utils/secureStorage'

const initialState = {
   isSignedIn: false,
   user: null,
}

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
   const [userState, dispatch] = useReducer(authReducer, initialState)
   console.log(userState)
   return <AuthContext.Provider value={{ userState, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
