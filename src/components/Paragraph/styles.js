import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   insta: {
      fontFamily: theme.FONTS.special,
   },
   semiBold: {
      fontFamily: theme.FONTS.semiBold,
   },
   bold: {
      fontFamily: theme.FONTS.bold,
   },
   textGiant: {
      fontSize: theme.SIZES.giant,
   },
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
   grey: {
      color: theme.COLORS.grey,
   },
   red: {
      color: theme.COLORS.red,
   },
   center: {
      textAlign: 'center',
   },
})

export default styles
