import { createContext } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../api'

export const UserInfoContext = createContext()

const checkIsFilled = (data) => !!(data.first_name && data.last_name)

const UserInfoContextProvider = ({ children }) => {
   const { userState } = useAuthContext()

   const { data: userData, isLoading } = useQuery(['users', userState.user?.id], () => getUserData(userState.user?.id), { enabled: !!userState.user })

   // if (isLoading) return null
   console.log('---------------------')
   const user =
      userState.user && userData
         ? {
              id: userState.user.id,
              email: userState.user.email,
              first_name: userData.data.first_name,
              last_name: userData.data.last_name,
              img_url: userData.data.img_url,
              isFilled: checkIsFilled(userData.data),
           }
         : null

   return <UserInfoContext.Provider value={{ user }}>{children}</UserInfoContext.Provider>
}

export default UserInfoContextProvider