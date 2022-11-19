import { View } from 'react-native'
import { Paragraph } from '../index'

const Header = ({ children, variant }) => {
   return (
      <View>
         <Paragraph variant={variant}>{children}</Paragraph>
      </View>
   )
}

export default Header
