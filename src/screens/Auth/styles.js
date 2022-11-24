import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: theme.SPACING.large,
   },
   wannaAuthWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginTop: theme.SPACING.medium,
   },
   errorContainer: {
      marginTop: -theme.SPACING.medium,
      marginBottom: theme.SPACING.medium,
   },
   databaseErrorContainer: {
      marginBottom: theme.SPACING.medium,
   },
})

export default styles
