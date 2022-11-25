import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.large,
      paddingVertical: theme.SPACING.small,
      backgroundColor: theme.COLORS.lightgrey,
      borderRadius: theme.RADIUS.standard,
      marginBottom: theme.SPACING.medium,
   },
   input: {
      flex: 1,
      marginLeft: theme.SPACING.medium,
   },
})

export default styles
