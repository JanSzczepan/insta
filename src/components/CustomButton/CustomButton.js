import { Pressable } from 'react-native'
import Paragraph from '../Paragraph/Paragraph'
import styles from './styles'

const CustomButton = ({ children, handleOnPress, buttonVariant, textVariant }) => {
   return (
      <Pressable
         onPress={handleOnPress}
         style={styles[buttonVariant]}
      >
         <Paragraph variant={textVariant}>{children}</Paragraph>
      </Pressable>
   )
}

export default CustomButton
