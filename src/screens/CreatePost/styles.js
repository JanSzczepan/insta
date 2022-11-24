import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   container: {
      paddingBottom: theme.SPACING.medium,
   },
   contentContainer: {
      paddingHorizontal: theme.SPACING.medium,
   },
   imageContainer: {
      flexDirection: 'row',
   },
   input: {
      marginVertical: theme.SPACING.medium,
      paddingVertical: theme.SPACING.small,
      fontSize: theme.SPACING.medium,
   },
})

export default styles
