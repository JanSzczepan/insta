import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.SPACING.large,
   },
   imageContainer: {
      flexDirection: 'row',
      marginBottom: theme.SPACING.large,
   },
   buttonsContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   errorContainer: {
      alignSelf: 'flex-start',
      marginTop: -theme.SPACING.medium,
      marginBottom: theme.SPACING.medium,
   },
})

export default styles
