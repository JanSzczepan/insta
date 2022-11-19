import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   textLarge: {
      fontSize: theme.SIZES.large,
   },
   textMedium: {
      fontSize: theme.SIZES.medium,
   },
   white: {
      color: theme.COLORS.white,
   },
   black: {
      color: theme.COLORS.black,
   },
})

export default styles
