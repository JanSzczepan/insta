import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: theme.COLORS.mediumgrey,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.COLORS.white,
   },
   commentInput: {
      flex: 1,
      paddingVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
      fontSize: theme.SPACING.medium,
   },
})

export default styles
