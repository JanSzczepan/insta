import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   welcome: {
      marginVertical: theme.SPACING.xlarge,
      paddingHorizontal: theme.SPACING.xxlarge,
      paddingVertical: theme.SPACING.medium,
      backgroundColor: theme.COLORS.blue,
      borderRadius: theme.RADIUS.standard,
   },
   auth: {
      width: '100%',
      alignSelf: 'center',
      paddingHorizontal: theme.SPACING.xxlarge,
      paddingVertical: theme.SPACING.medium,
      backgroundColor: theme.COLORS.blue,
      borderRadius: theme.RADIUS.standard,
   },
   wannaAuth: {
      backgroundColor: 'transparent',
      marginLeft: theme.SPACING.small,
   },
   post: {
      width: 100,
      paddingVertical: 10,
      backgroundColor: theme.COLORS.black,
   },
   deletePost: {},
})

export default styles
