import { StyleSheet } from 'react-native'
import theme from './theme'

const globalStyles = StyleSheet.create({
   input: {
      width: '100%',
      alignSelf: 'center',
      marginBottom: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
      paddingVertical: theme.SPACING.small,
      backgroundColor: theme.COLORS.lightgrey,
      borderRadius: theme.RADIUS.small,
      borderWidth: 1,
      borderColor: theme.COLORS.mediumgrey,
      color: theme.COLORS.black,
   },
})

export default globalStyles
