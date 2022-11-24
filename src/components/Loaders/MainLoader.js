import { AntDesign } from '@expo/vector-icons'
import { View } from 'react-native'
import theme from '../../constants/theme'
import styles from './styles'

const MainLoader = () => {
   return (
      <View style={styles.container}>
         <AntDesign
            name='instagram'
            size={theme.SIZES.xxxlarge}
            color={theme.COLORS.black}
         />
      </View>
   )
}

export default MainLoader
