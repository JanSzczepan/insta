import { createContext, useReducer } from 'react'
import { authReducer } from '../reducers/AuthReducer'

const initialState = {
   isSignedIn: false,
   token: null,
}

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
   const [user, dispatch] = useReducer(authReducer, initialState)

   return <AuthContext.Provider value={{ user, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
