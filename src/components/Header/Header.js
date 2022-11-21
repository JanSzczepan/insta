import { View } from 'react-native'
import Paragraph from '../Paragraph/Paragraph'
import styles from './styles'

const Header = ({ children, headerVariant, textVariant }) => {
   return (
      <View style={styles[headerVariant]}>
         <Paragraph variant={textVariant}>{children}</Paragraph>
      </View>
   )
}

export default Header
