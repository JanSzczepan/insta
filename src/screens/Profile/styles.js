import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   postsContainer: {
      flex: 1,
      paddingVertical: theme.SPACING.xxsmall,
      marginHorizontal: -theme.SPACING.xxsmall,
   },
   userContainer: {
      paddingVertical: theme.SPACING.medium,
      paddingHorizontal: theme.SPACING.medium,
      flexDirection: 'row',
      alignItems: 'center',
   },
   userNameContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.SPACING.large,
   },
   textContainer: {
      marginBottom: theme.SPACING.xsmall,
   },
   buttonsContainer: {
      flexDirection: 'row',
      paddingVertical: theme.SPACING.small,
      marginBottom: theme.SPACING.xsmall,
   },
})

export default styles
