import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { CustomButton, Header } from '../../components'
import styles from './styles'

const Welcome = () => {
   const { navigate } = useNavigation()

   const handleRedirect = () => {
      navigate('Auth')
   }

   return (
      <View style={styles.container}>
         <Header variant='textLarge'>Welcome</Header>
         <CustomButton
            handleOnPress={handleRedirect}
            buttonVariant={'welcome'}
            textVariant={['textMedium', 'white']}
         >
            Start your journey
         </CustomButton>
      </View>
   )
}

export default Welcome
