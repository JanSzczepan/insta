import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   textLarge: {
      fontSize: theme.SIZES.large,
   },
   textMedium: {
      fontSize: theme.SIZES.medium,
   },
   textSmall: {
      fontSize: theme.SIZES.small,
   },
   white: {
      color: theme.COLORS.white,
   },
   black: {
      color: theme.COLORS.black,
   },
   red: {
      color: theme.COLORS.red,
   },
})

export default styles
