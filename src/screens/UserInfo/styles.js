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
})

export default styles
