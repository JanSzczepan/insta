import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   contentWrapper: {
      paddingVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
   },
   divider: {
      height: 0.5,
      backgroundColor: theme.COLORS.mediumgrey,
   },
})

export default styles
