import { Text } from 'react-native'
import styles from './styles'

const Paragraph = ({ children, variant }) => {
   return <Text style={Array.isArray(variant) ? [...variant].map((v) => styles[v]) : styles[variant]}>{children}</Text>
}

export default Paragraph
