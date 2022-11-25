import { StyleSheet } from 'react-native'
import theme from '../../constants/theme'

const styles = StyleSheet.create({
   searchContainer: {
      padding: theme.SPACING.medium,
   },
   postsContainer: {
      flex: 1,
      paddingVertical: theme.SPACING.xxsmall,
      marginHorizontal: -theme.SPACING.xxsmall,
   },
})

export default styles
