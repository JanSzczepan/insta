import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   commentContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      marginBottom: theme.SPACING.small,
   },
   commentNameContainer: {
      flexDirection: 'row',
      alignContent: 'center',
      marginRight: theme.SPACING.small,
   },
})

export default styles
