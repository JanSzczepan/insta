import { Text, View } from 'react-native'
import { CustomButton } from '../../components'
import { useAuthContext } from '../../hooks/useAuthContext'
import useLogout from '../../hooks/useLogout'

const Profile = () => {
   const {
      userState: { user },
   } = useAuthContext()

   const { logout } = useLogout()

   return (
      <View>
         <View>
            <Text>{user?.email[0]}</Text>
         </View>
         <CustomButton
            handleOnPress={logout}
            buttonVariant='auth'
            textVariant={['textMedium', 'white']}
         >
            Logout
         </CustomButton>
      </View>
   )
}

export default Profile
