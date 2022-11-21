import { useNavigation } from '@react-navigation/native'
import { View } from 'react-native'
import { CustomButton, Header, Paragraph } from '../../components'
import styles from './styles'

const Welcome = () => {
   const { navigate } = useNavigation()

   const handleRedirect = () => {
      navigate('Auth')
   }

   return (
      <View style={styles.container}>
         <Header
            headerVariant='welcome'
            textVariant={['textGiant', 'black', 'insta']}
         >
            Instagram
         </Header>
         <Paragraph variant={['textSmall', 'grey', 'center']}>Sign in to see photos and videos {'\n'} from your friends</Paragraph>
         <CustomButton
            handleOnPress={handleRedirect}
            buttonVariant={'welcome'}
            textVariant={['textMedium', 'white', 'center', 'semiBold']}
         >
            Start your journey
         </CustomButton>
      </View>
   )
}

export default Welcome
