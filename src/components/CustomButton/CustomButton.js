import { Pressable } from 'react-native'
import Paragraph from '../Paragraph/Paragraph'
import styles from './styles'

const CustomButton = ({ children, handleOnPress, buttonVariant, textVariant, disabled }) => {
   return (
      <Pressable
         onPress={handleOnPress}
         style={styles[buttonVariant]}
         disabled={disabled}
      >
         <Paragraph variant={textVariant}>{children}</Paragraph>
      </Pressable>
   )
}

export default CustomButton
