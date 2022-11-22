import { useContext } from 'react'

import { UserInfoContext } from '../contexts/UserInfoContext'

export const useUserInfoContext = () => {
   const context = useContext(UserInfoContext)

   if (!context) throw Error('useUserInfoContext must be used inside an useUserInfoContextProvider')

   return context
}
